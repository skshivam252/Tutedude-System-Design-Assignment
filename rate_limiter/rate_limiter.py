from http.server import HTTPServer, SimpleHTTPRequestHandler
from datetime import datetime
from collections import deque


RATE_LIMIT_DICTIONARY = {}

class RateLimiter(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/data":
            client_ip , client_port = self.client_address
            current_time = datetime.now()
            # create queue for each client ip
            if(client_ip not in RATE_LIMIT_DICTIONARY):
                RATE_LIMIT_DICTIONARY[client_ip] = deque()
            #pop the time stamps that are more than 1 minute old
            while(len(RATE_LIMIT_DICTIONARY[client_ip]) > 0 and int((current_time - RATE_LIMIT_DICTIONARY[client_ip][0]).total_seconds()) > 60):
                RATE_LIMIT_DICTIONARY[client_ip].popleft()
            #check the requests in the 1 miute time frame
            #return the too may requests error
            if(len(RATE_LIMIT_DICTIONARY[client_ip])>=5):
                self.send_response(429)
                self.send_header('Content-type', 'text/plain')
                self.end_headers()
                self.wfile.write(b"Too many requests")
                return
            else:
                RATE_LIMIT_DICTIONARY[client_ip].append(current_time)
                self.send_response(200)
                self.send_header('Content-type', 'text/plain')
                self.end_headers()
                self.wfile.write(b"Server is listening")
        else:
            self.send_response(404)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(b"Not found")
