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

// This code defines a function called verify that serves as a middleware for checking the authenticity of a JSON Web Token (JWT) in a request.

// Here's a step-by-step explanation:

// const jwt = require("jsonwebtoken"); imports the jsonwebtoken library for use in the function.

// const authHeader = req.headers.token; retrieves the token from the Authorization header in the request.
// ?The Authorization header is an HTTP header that is commonly used for authentication purposes. It is used to send authentication information, such as an API key or a JSON Web Token (JWT), between a client and a server. The Authorization header is usually included in API requests and is used by the server to verify the identity of the client and determine what actions it is authorized to perform.
//? Authorization: Bearer <token>
// ? where <token> is a JSON Web Token. The Bearer keyword is used to specify the type of authorization information being transmitted. This header can be included in an API request to provide authentication information to the server.

// if (authHeader) { checks if the authHeader exists. If it does, it continues to the next step. If not, it returns res.status(401).json("You are not authenticated!"), which sends a 401 Unauthorized status code with a JSON message indicating that the user is not authenticated.

// const token = authHeader.split(" ")[1]; splits the authHeader string and retrieves the second item (the actual JWT).

// jwt.verify(token, process.env.SECRET_KEY, (err, user) => { uses the jwt.verify method to verify the JWT. The first argument is the token, the second argument is the secret key stored in the environment variable process.env.SECRET_KEY, and the third argument is a callback function that takes in an error err and a user user.

// if (err) res.status(403).json("Token is not valid!"); checks if there is an error while verifying the JWT. If there is, it sends a 403 Forbidden status code with a JSON message indicating that the token is not valid.

// req.user = user; sets the user information extracted from the JWT as a property of the request object.

// next(); calls the next middleware in the chain.

// This function verifies the authenticity of the JWT in a request, extracts the user information from it, and stores it in the request object for use in subsequent middlewares or handlers.