import requests

# set base url
BASE = 'http://127.0.0.1:5000/'

code = input("Enter name code:  ")

print("Predictions by Ann model")
response = requests.get(BASE + f'stock_ann/{code}')
print(response.json())