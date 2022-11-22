const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

/* A middleware function that checks if the token is valid. */
module.exports = function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Token does't exist",
      });
    }
    const decoded = jwt.verify(token,secrets.jwtSecret);
    req.userData = { email: decoded.email, userId: decoded.userId };
    next();
  } catch (ex) {
    return res.status(400).json({ message: "Auth failed!", error: ex.message });
  }
};
