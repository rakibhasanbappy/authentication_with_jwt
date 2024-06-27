// dependencies
const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({
        message: "Invalid token",
      });
    }
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = checkLogin;
