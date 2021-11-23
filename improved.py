# importing libraries

import numpy as np
import pandas as pd
import datetime as dt
from datetime import timedelta
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import yfinance as yf
plt.style.use('dark_background')


def menu():
    print("Here are some of the popular stocks and cryptos along with their codes")
    print("TATA MTRS \t\t\t\t\t TATAMOTORS.NS")
    print("SPY       \t\t\t\t\t SPY")
    print("Samsung   \t\t\t\t\t SSNLF")


menu()

# loading the data
name = input("Enter the code of the portfolio or cryptocurrency or individual stock on the market")
data = yf.download(name, auto_adjust=True)
print(data)

data = data[['Close']]
data = data.dropna()
# print(data)

data.plot(figsize=(10, 7), color='r')
plt.ylabel("Stock Closing Prices")
plt.title("Stock ETF Price Series")
plt.show()

data['S_3'] = data['Close'].rolling(window=3).mean()
data['S_9'] = data['Close'].rolling(window=9).mean()
print(data.head())
data = data.dropna()


y = data['Close']
x = data[['S_3', 'S_9']]

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=.2)

model = LinearRegression()
model.fit(x_train.values, y_train.values)
pred = model.predict(x_test.values)

print("Linear Regression model")
print("Gold ETF Price (y) = %.2f * 3 Days Moving Average (x1) \
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

pred = pd.DataFrame(pred, index=y_test.index, columns=['price'])
pred.plot(figsize=(10, 7), linewidth=2)
y_test.plot()

plt.ylabel("Stock Price")
plt.scatter(current, p[0], color='GREEN')
plt.legend(['predicted_price', 'actual_price', 'Next day'])
plt.show()
