from flask import Flask, Response
import requests

app = Flask(__name__)

SERVERS = [
    "http://localhost:5001",
    "http://localhost:5002",
    "http://localhost:5003",
]

current_server = 0  

@app.route("/")
def load_balance():
    global current_server
    backend_url = SERVERS[current_server]
    current_server = (current_server + 1) % len(SERVERS)

    try:
        response = requests.get(backend_url)
        return Response(response.text, status=response.status_code)
    except requests.exceptions.RequestException:
        return Response("Backend server unavailable", status=503)

if __name__ == "__main__":
    app.run(port=5000)
