import time
import requests

URL = "http://localhost:5000"

REQUEST = 1

while True:
    try:
        response = requests.get(URL)
        print(f"[{REQUEST}] {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] {e}")
    
    REQUEST = REQUEST + 1
    time.sleep(2)
