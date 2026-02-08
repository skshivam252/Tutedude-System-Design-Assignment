from http.server import HTTPServer
from rate_limiter import RateLimiter

HOST="127.0.0.1"
PORT=8000

with HTTPServer((HOST,PORT),RateLimiter) as server:
    print(f"Server is listening on {PORT}")
    server.serve_forever()