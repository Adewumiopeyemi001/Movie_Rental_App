const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("X-Auth-Token");
  if (!token) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decoded; // Attach decoded user information to the request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    // Token verification failed (invalid token or expired)
    res.status(401).send("Invalid Token"); // Use 401 Unauthorized for invalid tokens
  }
}

module.exports = auth;
