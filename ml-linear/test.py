import requests

# set base url
BASE = 'http://127.0.0.1:5000/'

inp = input("Enter name code:  ")

print("Predictions by linear regression")
response = requests.get(BASE + f'stock_lr/{inp}')
print(response.json())

'''
print("Predictions by Ann model")
response = requests.get(BASE + f'stock_ann/{inp}')
print(response.json())
'''