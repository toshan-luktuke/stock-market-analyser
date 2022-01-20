#Importing Libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import math
import datetime as dt
from keras.models import Sequential
from keras.layers.core import Dense, Dropout, Activation
import yfinance as yf
import os
import pickle
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"


def find(name):
    #Loading the data
    data = yf.download(name, auto_adjust=True)

    #Check for valid stock code entered by the user
    if data.empty:
        print("You did not enter a valid stock code")
        return -1
    
    #Setting the date as index for data
    data = data.reset_index()
    data = data.set_index(pd.DatetimeIndex(data['Date'].values))
    #Dropping unwanted columns
    data.drop(data.columns[[3]], axis=1, inplace=True)
    # print(data)

    #Normalizing/Removing null data points
    data['Open'] = data['Open']/100
    data['Close'] = data['Close']/100
    data['High'] = data['High']/100
    data['Volume'] = data['Volume']/1000000
    # print(data)

    nan_value_index = []

    High = data.High.isnull()
    for i in range(0, len(High)):
        if High[i] == 1:
            nan_value_index.append(i)
            data['High'][i] = 0
    Open = data.Open.isnull()
    for i in range(0, len(Open)):
        if Open[i] == 1:
            nan_value_index.append(i)
            data['Open'][i] = 0
    Volume = data.Volume.isnull()
    for i in range(0, len(Volume)):
        if Volume[i] == 1:
            nan_value_index.append(i)
            data['Volume'][i] = 0
    Close = data.Close.isnull()
    for i in range(0, len(Close)):
        if Close[i] == 1:
            nan_value_index.append(i)
            data['Close'][i] = 0

    X = data[['High','Open', 'Volume']]
    Y = data[['Close']]

    #Splitting the data for training/testing
    length = X.shape[0]
    train = int(length*0.80)
    X_train = X[:train]
    Y_train = Y[:train]
    X_test = X[train:]
    Y_test = Y[train:]
    #print("X_train", X_train.shape)
    #print("y_train", Y_train.shape)
    #print("X_test", X_test.shape)
    #print("y_test", Y_test.shape)

    # Training the Neural Network Model
    model = Sequential()
    # Adding the input and hidden layers
    model.add(Dense(units = 32, kernel_initializer = 'uniform', activation = 'relu', input_dim = 3))
    model.add(Dense(units = 10, kernel_initializer = 'uniform', activation = 'relu'))
    # Adding output layer
    model.add(Dense(units = 1, kernel_initializer = 'uniform', activation = 'linear'))
    # To compile the neural network model
    model.compile(optimizer = 'adam', loss = 'mean_squared_error', metrics = [])
    # Fitting the model to the training data
    model.fit(X_train, Y_train, batch_size = 128, epochs = 10, validation_split=0.05)

    # filename = 'ANNmodel.sav'
    # pickle.dump(model, open(filename, 'wb'))

    # Loading the saved model
    # model = pickle.load(open(filename, 'rb'))

    # Predicted Values
    prediction = model.predict(X_test)
    # print(prediction*100)

    # Predictions vs Actual results
    # plt.plot(prediction*100,color='blue', label='Predictions by the model')
    # plt.legend(loc='upper left')
    # plt.show()
    # plt.plot(Y_test*100,color='black', label='Actual stock values')
    # plt.legend(loc='upper left')
    # plt.show()
    # print(prediction)
    # print(Y_test)

    # Calculating the Accuracy of our trained Neural Network model
    score = model.evaluate(X_train, Y_train, verbose = 0)
    print("Accuracy = ", (100-score), "%")

    data = data.iloc[len(data)-10:]
    data = data[['High','Open', 'Volume']]
    pred = model.predict(data*100, verbose=0)
    return {'p1': {'today_closing_price': pred[0][0]}}