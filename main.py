from flask import Flask, jsonify
from flask_restful import Api, Resource, abort
from Model.linear_reg_model import find_r
from Model.ann_model import find
from flask_cors import CORS
import pickle
import yfinance as yf

app = Flask(__name__)
cors = CORS(app)
api = Api(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['CORS_HEADERS'] = 'Content-Type'

list_stocks = ['SPY', 'TSLA', 'FB', 'GOOG', 'GOOGL', 'AAPL', 'TTM', 'RELI']


class Stock_Reg(Resource):
    def get(self, stock_name):
        try:
            model = pickle.load(open(f"Models/Linear regression/{stock_name}.pkl", 'rb'))

            data = yf.download(stock_name, auto_adjust=True)
            data = data[['Close']]
            data = data.dropna()
            s3_1 = data['Close'][-3:].mean()
            s9_1 = data['Close'][-9:].mean()
            res = model.predict([[s3_1, s9_1]])

            # res = find_r(stock_name)
            if res[0] == -1 or stock_name not in list_stocks:
                abort(404, message="Stock code is invalid")
            response = jsonify({'data': res[0]})
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response
        except:
            print("SERVER ERROR 500")

'''
class Stock_ANN(Resource):
    def get(self, stock_name):
        try:
            #intead of usinf find func load it
            res = find(stock_name)
            if res == -1:
                abort(404, message="Stock code is invalid")
            response = jsonify(str(res))
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response
        except:
            print("SERVER ERROR 500")
'''


api.add_resource(Stock_Reg, '/stock_lr/<string:stock_name>')
# api.add_resource(Stock_ANN, '/stock_ann/<string:stock_name>')
