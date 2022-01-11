# importing libraries

import pandas as pd
import datetime as dt
from datetime import timedelta
import matplotlib.pyplot as plt
import matplotlib
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import yfinance as yf
import pickle
plt.style.use('dark_background')
matplotlib.use('Agg')


# ignore useless warnings of Linear regression
import warnings
warnings.filterwarnings("ignore")


# loading the data
def find_r(name):
    # name = input("Enter the code of the portfolio or cryptocurrency or individual stock on the market: ")
    data = yf.download(name, auto_adjust=True)

    # check for valid stock code entered by the user
    if data.empty:
        print("You did not enter a valid stock code")
        return -1

    # print(data)

    data = data[['Close']]
    data = data.dropna()
    # print(data)

    # plot the data
    data.plot(figsize=(10, 7), color='r')
    plt.ylabel("Stock Closing Prices")
    plt.title("Stock Price Series")
    plt.show()

    data['S_3'] = data['Close'].rolling(window=3).mean()        # this is for the average of the lsat 3 days
    data['S_9'] = data['Close'].rolling(window=9).mean()        # this is for the average of the last 9 days
    # print(data.head())
    data = data.dropna()                                            # remove rows with null values

    # set the independent and dependent dataframes
    y = data['Close']
    x = data[['S_3', 'S_9']]

    # split the data into test and train datasets
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=.2)

    # train the model
    model = LinearRegression()
    model.fit(x_train.values, y_train.values)

    # Saving the model
    filename = 'LinearReg_model.sav'
    pickle.dump(model, open(filename, 'wb'))

    # Loading the saved model
    loaded_model = pickle.load(open(filename, 'rb'))

    pred = loaded_model.predict(x_test.values)

    # description of the model
    print("Linear Regression model")
    print("Stock price (y) = %.2f * 3 Days Moving Average (x1) \
    + %.2f * 9 Days Moving Average (x2) \
    + %.2f (constant)" % (loaded_model.coef_[0], loaded_model.coef_[1], loaded_model.intercept_))
    print("Accuracy = ", loaded_model.score(x_train, y_train)*100, " %")

    current = dt.datetime.now()
    tom = current + timedelta(1)

    # day 1
    s3_1 = data['Close'][-3:].mean()
    s9_1 = data['Close'][-9:].mean()
    # print(s3_1, s9_1)
    p = loaded_model.predict([[s3_1, s9_1]])
    # print(p)

    # day 2
    s3_2 = (data['Close'][-2:].mean() + p[0])/2
    s9_2 = (data['Close'][-8:].mean() + p[0])/2
    # print(s3_2, s9_2)
    q = loaded_model.predict([[s3_2, s9_2]])
    # print(q)

    # day 3
    s3_3 = (data['Close'][-1:].mean() + p[0] + q[0]) / 3
    s9_3 = (data['Close'][-7:].mean() + p[0] + q[0]) / 3
    # print(s3_3, s9_3)
    r = loaded_model.predict([[s3_3, s9_3]])
    # print(r)

    # print('current date: ', current)
    # print("Today's predicted closing price: ", p[0])
    # print("Tomorrow's predicted closing price", q[0])
    # print("Day after tomorrow's predicted closing price", r[0])

    # plot
    pred = pd.DataFrame(pred, index=y_test.index, columns=['price'])
    # pred.plot(figsize=(10, 7), linewidth=2)
    # y_test.plot()

    # plt.ylabel("Stock Price")
    # plt.scatter(current, p[0], color='GREEN')
    # plt.scatter(current+timedelta(days=1), q[0], color="CYAN")
    # plt.scatter(current+timedelta(days=2), r[0], color="YELLOW")
    # plt.legend(['predicted_price', 'actual_price', 'Next day'])
    # plt.show()
    return {'p1': {'today_closing_price': p[0]},
            'p2': {'tomorrow_closing_price': q[0]},
            'p3': {'day_after_tomorrow_closing_price': r[0]}
            }
