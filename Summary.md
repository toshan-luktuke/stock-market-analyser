# Stock market analyser
# In depth description and comparison of all models

### The input and dataset
We take the market code of the stock that the user is interested in and generate a dataset using the yfinance module.
Here is an example of what the dataset would look like.
<br><br>

<img width="451" alt="image" src="https://user-images.githubusercontent.com/68846562/144289955-bdf9d9d2-6cb7-4dcc-ae20-c26ccc69ee05.png">
This is a dataset of the stock with code 'SPY'
<br><br>
<hr>

### Here's a list of the models implemented:

<ol style="1">
  <li> Linear Regression Model </li>
  <li> Artificial nueral network (ANN) </li>
</ol>
<hr>

## 1. Linear Regression

Linear Regression is a machine learning algorithm based on supervised learning. It performs a regression task. Regression models a target prediction value based on independent variables. It is mostly used for finding out the relationship between variables and forecasting. Different regression models differ based on – the kind of relationship between dependent and independent variables, they are considering and the number of independent variables being used.

<br>
<img width="350" alt="image" src="https://static.javatpoint.com/tutorial/machine-learning/images/linear-regression-in-machine-learning.png">
<br>

Hypothesis function for Linear Regression :
<br><br>
<img width="379" alt="image" src="https://user-images.githubusercontent.com/68846562/144295303-37fcbc57-8757-481c-b029-55f5e125dee8.png">
<br>

The best fit line will have intercepts and coefficients. Once we find the best θ1 and θ2 values, we get the best fit line. So when we are finally using our model for prediction, it will predict the value of y for the input value of x. We find the best values for these values by minimzing the cost function J(theta) using steepest decent. Here the cost function is root mean squared error. 
<br><br>
<img width="225" alt="image" src="https://user-images.githubusercontent.com/68846562/144296265-d5ccc5fd-e343-411e-a9b3-6d827543d31e.png">
<br>

After loading the data set of the required stock from yahoo finance we observe the data set and create features to train the machine learning model
We store the closing prices of that stock in 'Y' (the result).
Here to predict the price we take 2 features.
1. the moving average of the closing price for the past 3 days. [s_3]
2. the moving average of the closing price for the past 9 days. [s_9] 

The data is the cleaned.

Initial plot of the data set
<br><br>
<img width="853" alt="image" src="https://user-images.githubusercontent.com/68846562/144293923-ec23fcf7-0eec-4c14-b8b9-661ef924b7d5.png">
<br>

We know split the dataset into training and testing datasets and the create and test the model.
<br><br>
<img width="863" alt="image" src="https://user-images.githubusercontent.com/68846562/144294485-9a34b96f-bb8a-49e1-8aca-5db6256d4dbc.png">
<br>

Below is an example of a linear regression model
<br>
<br>
<img width="718" alt="image" src="https://user-images.githubusercontent.com/68846562/144295795-85295129-6fb2-46c7-9b11-ba3838895aa7.png"><hr>

## 2. Artificial Neural Networks

Artificial Neural Networks (ANN) is a predictive model designed to function just the way a human brain does.
There are several aspects to consider while designing an ANN, these include the type of network used (feedforward, recurrent, backpropagation), the type of training used (unsupervised, supervised), the percentage of training and testing data sets (i.e., 70:30 / 80:20), the number of input / output units, number of the hidden layers, number of repetitions during the training process (epochs), choice of activation function (sigmoid, linear) and data set size.

Here's a representation of a simple neural network with one input layer, one hidden layer, and an output layer.
<br>
<img width = 600 alt = "Img" src = "http://analyticsindiamag.com/wp-content/uploads/2017/09/Screen-Shot-2017-09-05-at-9.20.19-AM.png">
<br>

The 2 basic steps involved in executing a neural network are: Feed Forward & Back Propagation
<ul>
<li>Feed Forward</li>
In the feed-forward step, predictions are made based on the values within the input nodes and their weights. The weights of a neural network are the strings that we need to adjust to be able to accurately make our predictions.
 <img alt = "Equation" src = "https://user-images.githubusercontent.com/84401192/144834177-7ab83597-1e4a-4a10-af0b-402d8f0a96f6.png">
  
<li>Back Propagation</li>
Before training the neural network, it makes random predictions. In the back propagation, the algorithm is trained to fine-tune the weights and achieve an accurate prediction.
This can be done by trying to minimize our cost function.<br><br>
<img width = 300 alt = "Img" src = "https://miro.medium.com/max/760/1*F6ClwOW-dmFEnJrVLFCaqQ.png"><br>
</ul><br>
<b>Real Values vs. Predicted Values:</b><br><br>
<img alt = "Graph" src = "https://user-images.githubusercontent.com/84401192/144832933-cb1ac908-88c1-4db7-8814-1e6b3f5d9a4a.png">
<b>Accuracy achieved by this model</b>
<br>
<img src = "https://user-images.githubusercontent.com/84401192/144830234-03d7679d-0323-492e-acfe-720e946c4a3d.png">


