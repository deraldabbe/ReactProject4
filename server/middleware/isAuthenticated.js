// Read through the code and write at least 5 comments explaining different parts of the code. Break it down piece by piece, and even pull in a peer or yout tech lead to rubber duck.

// 1. Load environment variables from the .env file in the project directory.
require("dotenv").config();
// 2. Import the 'jsonwebtoken' library, used for working with JSON Web Tokens (JWT).
const jwt = require("jsonwebtoken");
// 3. Retrieve the 'SECRET' value from the environment variables loaded in step 1.
const { SECRET } = process.env;
// 4. Export an object containing a middleware function named 'isAuthenticated'.
module.exports = {
  // 5. 'isAuthenticated' middleware function used to check if a user is authenticated.
  isAuthenticated: (req, res, next) => {
    // 6. Get the token from the 'Authorization' header of the incoming request.
    const headerToken = req.get("Authorization");
    // 7. If no token is provided in the request header, return a 401 Unauthorized status.
    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }
    let token;
    try {
      // 8. Verify the token using the 'jsonwebtoken' library and the 'SECRET' from the environment variables.
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      // 9. If an error occurs during token verification, set a custom status code (500) and throw the error.
      err.statusCode = 500;
      throw err;
    }
    // 10. If the token is successfully verified, move to the next middleware or route handler.
    // Otherwise, if the token is invalid or expired, throw an error with a 401 Unauthorized status.
    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }
    // 11. Call the 'next' function to move to the next middleware or route handler in the request processing pipeline.
    next();
  },
};
