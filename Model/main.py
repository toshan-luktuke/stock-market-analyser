from flask import Flask
from flask_restful import Api, Resource, abort
from Model.linear_reg_model import find_r
from Model.ann_model import find

app = Flask(__name__)
api = Api(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'


class Stock_Reg(Resource):
    def get(self, stock_name):
        try:
            res = find_r(stock_name)
            if res == -1:
                abort(404, message="Stock code is invalid")
            return {'data': res}
        except:
            print("SERVER ERROR 500")


class Stock_ANN(Resource):
    def get(self, stock_name):
        try:
            res = find(stock_name)
            if res == -1:
                abort(404, message="Stock code is invalid")
            return {'data': str(res)}
        except:
            print("SERVER ERROR 500")


api.add_resource(Stock_Reg, '/stock_lr/<string:stock_name>')
api.add_resource(Stock_ANN, '/stock_ann/<string:stock_name>')


if __name__ == "__main__":
    app.run(debug=True)
