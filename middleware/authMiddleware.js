// Importing the jsonwebtoken library to handle JWT operations
const jwt = require("jsonwebtoken");

// Middleware function to authenticate requests using JWT
const authMiddleware = (req, res, next) => {
  try {

    // Extract the Authorization header from the incoming request
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization required",
      });
    }

    // Extract the token from the Authorization header  
    const token = authHeader.split(" ")[1];

    // Verify the token using the secret key and decode its payload
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach the decoded user information to the request object for use in subsequent middleware or route handlers
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

// Export the authMiddleware function to be used in other parts of the application
module.exports = authMiddleware;