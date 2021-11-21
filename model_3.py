# import libraries
# import numpy as np
import pandas as pd
import datetime as dt
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import yfinance as yf

# loading the data
data = yf.download('SPY')
# Stock name: SPDR S&P 500 ETF Trust (SPY) dont know this just picked from the net :)
# print(data.head())

# plotting the historic data
plt.figure(1)
data['Close'].plot()
plt.ylabel("Price")
plt.legend()
plt.title("Over the years")
plt.show()

# For simplicity shift the date into its own column
data = data.reset_index()
data['Date'] = pd.to_datetime(data['Date'])
data['Date_1'] = data['Date'].map(dt.datetime.toordinal)
# x = np.array(data.index).reshape(-1, 1)    # numpy array of the new indexes
x = data['Date_1']
y = data['Close']
print(data.head(10))

# splitting the data
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2)
# print(x_train)
# print(x_test)
# print(y_train)
# print(y_test)
x_train = x_train.to_numpy().reshape(-1, 1)
x_test = x_test.to_numpy().reshape(-1, 1)
y_train = y_train.to_numpy().reshape(-1, 1)
y_test = y_test.to_numpy().reshape(-1, 1)
# print(x_train)
# print(x_test)
# print(y_train)
# print(y_test)

# The ML model
model = LinearRegression()
model.fit(x_train, y_train)
pred = model.predict(x_test)

# note that this model does not account for tax as well as the residual brokerage fees

print("Accuracy = ", model.score(x_train, y_train))

year = int(input("Enter the year: "))
month = int(input("Enter the month: "))
day = int(input("Enter the day: "))
dte = dt.datetime(year, month, day).toordinal()
p = model.predict([[dte]])
print(p, p[0][0])

"""
for i in range(len(x_test)):
    x_test[i][0] = dt.date.fromordinal(x_test[i][0])        # use julian
"""

# result
print(pred)
plt.figure(2)
plt.scatter(x_test, y_test)
# plt.plot([dte, p[0][0]])
plt.scatter(dte, p[0][0], label="User requested point")
plt.plot(x_test, pred, '-r')
plt.legend()
plt.title("Linear Regression model")
plt.show()

