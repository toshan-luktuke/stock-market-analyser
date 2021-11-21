# first model trial using linear regression

# import necessary libraries
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import pandas_ta
import datetime as dt
import yfinance as yf
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error

plt.style.use('seaborn-darkgrid')

# load data
# start: 01-01-2020     end: 01-01-2021         weekly
data = pd.read_csv('TATAMOTORS.NS.csv')
# print(data)

# details of sample
stock = 'TATA MOTORS'
start = dt.datetime(2020, 1, 1)
end = dt.datetime(2021, 1, 1)

# closing prices weekly graph for a year
data.set_index('Date', inplace=True)
data = data[['Adj Close']]
print(data.head())
plt.figure(1)
plt.plot(data['Adj Close'], label="Closing prices weekly")
plt.xticks(rotation=60)
plt.ylabel("TATA Stock Prices")
plt.title("TATA MOTORS")
plt.legend()
plt.show()

# converting dataframe data to numpy arrays
dates = data.index.to_numpy().reshape(-1, 1)

# creating a new feature : EMA == exponential moving average
data.ta.ema(close='Adj Close', length=10, append=True)
# print(data)
# Here on printing we see that the first 9 EMA_10 values will be NaN since the length given by us was 10.
# i.e the last 10 weeks closing prices will affect the next day adj closing price.
# we simply drop the first 9 rows
data = data.iloc[10:]

# plotting ema and adj_close
plt.figure(2)
plt.plot(data['Adj Close'], label="Adj Closing Price")
plt.plot(data['EMA_10'], label="Exponential moving average")
plt.xticks(rotation=60)
plt.ylabel("TATA Stock Prices")
plt.title("TATA MOTORS")
plt.legend()
plt.show()


# splitting the data into testing and training data
x_train, x_test, y_train, y_test = train_test_split(data[['Adj Close']], data[['EMA_10']], test_size=0.2)

# print(x_train.shape) ==> (34,1)
# print(x_test.shape)  ==> (9,1)
# print(y_train.shape) ==> (34,1)
# print(y_test.shape)  ==> (9,1)

# designing and training the model
model = LinearRegression()
model.fit(x_train, y_train)
pred = model.predict(x_test)

# validating the trained model fit
print("Model Coefficients:", model.coef_)
print("Mean Absolute Error:", mean_absolute_error(y_test, pred))
print("Coefficient of Determination:", r2_score(y_test, pred))
print(pred)
print("Accuracy of the model: ", model.score(x_test, y_test))


# the line of linear regression
plt.figure(3)
plt.scatter(x_test, y_test, label="Actual Value")
plt.plot(x_test, pred, '-b', marker='o', markerfacecolor='orange', label="Predicted Value")
plt.legend()
plt.ylabel("ADJ close")
plt.title("Linear Regression model")
plt.xticks(rotation=60)
# for i in range(len(x_test)):
    # lineXdata = (x_test[i], x_test[i]) # same X
    # lineYdata = (y_test[i], pred[i]) # different Y
    # plt.plot(lineXdata, lineYdata)
plt.show()

plt.figure(4)
plt.scatter(x_test.index, y_test, label="Actual Value")
plt.plot(x_test.index, pred, '-b', marker='o', markerfacecolor='orange', label="Predicted Value")
plt.legend()
plt.xlabel("Dates")
plt.ylabel("ADJ close")
plt.title("Comparison")
plt.xticks(rotation=60)
plt.show()

print(x_test)