import requests

# set base url
BASE = 'http://127.0.0.1:5000/'

inp = input("Enter name code: ")

response = requests.post(BASE + f'stock/{inp}')
print(response.json())