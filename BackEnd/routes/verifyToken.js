const jwt = require("jsonwebtoken");
// !Before getting the data of an user by using a get route , we have to evaluate the token which was created at the time when the user logged in
// ?Middleware to verify jwt
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; //Expecting "Bearer <token>"
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }
  try {
    const decoded = jwt.verify(token, "abusad"); // Use the same secret key as during login
    req.userId = decoded.userId; // Attach userId to the request object
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
