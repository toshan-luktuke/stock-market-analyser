from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from model import find

app = Flask(__name__)
api = Api(app)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'


class Stock(Resource):
    def post(self, stock_name):
        res = find(stock_name)
        if res == -1:
            abort(404, message="Stock code is invalid")
        return {'data': res}


api.add_resource(Stock, '/stock/<string:stock_name>')


if __name__ == "__main__":
    app.run(debug=True)