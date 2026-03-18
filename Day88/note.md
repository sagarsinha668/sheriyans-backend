<!-- status code -->
# 2xx: Success

200 OK for get
201 CREATED for post
204 NO CONTENT for delete

# 3xx: Redirection

These mean "The thing you want is somewhere else."
301 Moved Permanently: The URL has changed forever.
304 Not Modified: Tells the browser to use its cached version because nothing has changed on the server.

# 4xx: Client Error

These mean "You (the client) messed up."
400 Bad Request: The server didn't understand the request (maybe a syntax error or missing data).
401 Unauthorized: You need to log in to see this.
403 Forbidden: You're logged in, but you don't have permission to be here.
404 Not Found: The classic. The resource doesn't exist.

# 5xx: Server Error
    
These mean "I (the server) messed up."
500 Internal Server Error: The "catch-all" for when your code crashes or something goes wrong behind the scenes.
503 Service Unavailable: The server is overloaded or down for maintenance.


