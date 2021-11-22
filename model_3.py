# import libraries
import numpy as np
import pandas as pd
import datetime as dt
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import yfinance as yf
plt.style.use('seaborn-darkgrid')


def menu():
    print("Here are some of the popular stocks and cryptos along with their codes")
    print("Bitcoin   \t\t\t\t\t BTC-USD")
    print("Ethereum  \t\t\t\t\t ETH-USD")
    print("Dogecoin  \t\t\t\t\t DOGE-USD")
    print("Apple     \t\t\t\t\t APPL")
    print("TATA MTRS \t\t\t\t\t TATAMOTORS.NS")
    print("SPY       \t\t\t\t\t SPY")
    print("Samsung   \t\t\t\t\t SSNLF")


menu()

# loading the data
name = input("Enter the code of the portfolio or cryptocurrency or individual stock on the market")
data = yf.download(name)
# Stock name: SPDR S&P 500 ETF Trust (SPY) dont know this just picked from the net :)
# SPY is a box of all the top stocks in USA
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
x = data[['Date_1', 'Volume']].dropna()
y = data['Close'].dropna()
print(data.head())

# splitting the data
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2)
# print(x_train)
# print(x_test)
# print(y_train)
# print(y_test)

print(x_train)
print(x_test)
print(y_train)
print(y_test)

dates = x_test['Date_1'].to_numpy().reshape(-1,1)

# The ML model
model = LinearRegression()
model.fit(x_train.values, y_train.values)
pred = model.predict(x_test.values)

# note that this model does not account for tax as well as the residual brokerage fees

print("Accuracy = ", model.score(x_train, y_train))

year = int(input("Enter the year: "))
month = int(input("Enter the month: "))
day = int(input("Enter the day: "))
v = int(input("Enter the volume: "))
dte = dt.datetime(year, month, day).toordinal()
p = model.predict([[dte, v]])
print(p, p[0])

x_plot = np.empty_like(dates, dtype=dt.datetime)

for i in range(dates.size):
    x_plot[i][0] = dt.date.fromordinal(dates[i][0])


# result
print(pred)
plt.figure(2)

plt.scatter(x_plot, y_test)
plt.scatter(dt.datetime.fromordinal(dte), p[0], label="User requested point")
plt.scatter(x_plot, pred,)
plt.legend()
plt.title("Linear Regression model")
plt.xlabel("Year")
plt.ylabel("ADJ Closing")
plt.show()
