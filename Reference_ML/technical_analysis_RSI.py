#Importing Libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
plt.style.use('fivethirtyeight')
import yfinance as yf

#Loading the data
data = yf.download('SPY')
#print(data.head())

#Setting the dates as index for data
data = data.reset_index()
data = data.set_index(pd.DatetimeIndex(data['Date'].values))
#print(data)

#Plotting prices visually
plt.figure(figsize=(12.2,4.5))
plt.plot(data.index, data['Adj Close'], label = 'Adj Close Price')
plt.title("Adj CLose price History")
plt.xlabel("1992 - 2020")
plt.ylabel("Adj Close Price")
plt.show()

#Calculating the RSI (Preparation of Data) -- Relative Strength Index
#FOr consecutive day price differences
dif = data['Adj Close'].diff(1)
dif = dif.dropna() #removing Nan vals
#print(dif)

#Calculating ups and downs (positive/negative gains)
up = dif.copy()
down = dif.copy()
#Contains only negative values
down[down>0] = 0
#Contains only positive values
up[up<0] = 0
#print(up)
#print(down)
#common time period used to calc rsi = 14 days
time = 14 
avgGain = up.rolling(window = time).mean()
avgLoss = abs(down.rolling(window = time).mean())
RS = avgGain/avgLoss
RSI = 100.0 - (100.0/(1.0 + RS))
#Plotting the RSI
plt.figure(figsize=(10,5))
plt.title("RSI PLOT HISTORY")
RSI.plot()
plt.show()
#print(RSI)

#Creation of new dataframe
newDF = pd.DataFrame()
newDF['Adj Close Price'] = data['Adj Close']
newDF['RSI'] = RSI
#print(len(newDF))
length = len(newDF)
posn = length-60
newDF = newDF.iloc[posn:]
print(newDF)

#Plotting it
plt.figure(figsize=(15,5))
plt.plot(newDF.index, newDF['Adj Close Price'])
plt.title('Adj Close price')
plt.legend(newDF.columns.values, loc = 'best')
plt.show()

plt.figure(figsize=(15,5))
plt.title('Relative Strength Index')
plt.plot(newDF.index, newDF['RSI'])
"""ax = plt.gca()
ax.set_xlim([1992,2000])"""
plt.axhline(0, linestyle = '--', alpha = 0.5, color = 'black')
plt.axhline(10, linestyle = '--', alpha = 0.5, color = 'red')
plt.axhline(20, linestyle = '--', alpha = 0.5, color = 'orange')
plt.axhline(30, linestyle = '--', alpha = 0.5, color = 'yellow')
plt.axhline(70, linestyle = '--', alpha = 0.5, color = 'yellow')
plt.axhline(80, linestyle = '--', alpha = 0.5, color = 'orange')
plt.axhline(90, linestyle = '--', alpha = 0.5, color = 'red')
plt.axhline(100, linestyle = '--', alpha = 0.5, color = 'black')
