const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

module.exports = verify;


/* This is a Node.js script that exports a "verify" function which can be used as middleware in a route handler to verify a JSON web token (JWT) passed in the "token" header of an incoming HTTP request. The function first checks if the "token" header is present in the request headers, and if not, sends a 401 "Unauthenticated" response to the client. If the header is present, it splits the header value by space and takes the second element (the actual token) and verifies it using the jsonwebtoken library's "verify" method. The secret key used for verification is taken from the process.env.SECRET_KEY environment variable. If the token is valid, the payload of the token (i.e the "user" object) is attached to the request object as "req.user" which can be used later in the request's lifecycle. If the token is invalid, it sends a 403 "Forbidden" response to the client. Finally, the function calls the next middleware function in the route handler. */