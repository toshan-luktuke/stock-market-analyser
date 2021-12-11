# importing libraries

import pandas as pd
import datetime as dt
from datetime import timedelta
import matplotlib.pyplot as plt
import matplotlib
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import yfinance as yf
plt.style.use('dark_background')
matplotlib.use('Agg')


# ignore useless warnings of Linear regression
import warnings
warnings.filterwarnings("ignore")


# loading the data
def find(name):
    # name = input("Enter the code of the portfolio or cryptocurrency or individual stock on the market: ")
    data = yf.download(name, auto_adjust=True)

    # check for valid stock code entered by the user
    if data.empty:
        print("You did not enter a valid stock code")
        return -1

    print(data)

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
    print(data.head())
    data = data.dropna()                                            # remove rows with null values

    # set the independent and dependent dataframes
    y = data['Close']
    x = data[['S_3', 'S_9']]

    # split the data into test and train datasets
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=.2)

    # train the model
    model = LinearRegression()
    model.fit(x_train.values, y_train.values)
    pred = model.predict(x_test.values)

    # description of the model
    print("Linear Regression model")
    print("Stock price (y) = %.2f * 3 Days Moving Average (x1) \
    + %.2f * 9 Days Moving Average (x2) \
    + %.2f (constant)" % (model.coef_[0], model.coef_[1], model.intercept_))
    print("Accuracy = ", model.score(x_train, y_train)*100, " %")

    current = dt.datetime.now()
    tom = current + timedelta(1)

    s3 = data['Close'][-3:].mean()
    s9 = data['Close'][-9:].mean()
    print(s3, s9)
    p = model.predict([[s3, s9]])
    print(p)

    print('current date: ', current)
    print("Next day's closing price: ", p[0])

    # plot
    pred = pd.DataFrame(pred, index=y_test.index, columns=['price'])
    pred.plot(figsize=(10, 7), linewidth=2)
    y_test.plot()

    plt.ylabel("Stock Price")
    plt.scatter(current, p[0], color='GREEN')
    plt.legend(['predicted_price', 'actual_price', 'Next day'])
    plt.show()
    return {'next_days_price': p[0]}
