const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  jwt.verify(token, "secret", (err, user) => {
    if (err) return next(errorHandler(401, "You are not authenticated!"));
    req.user = user;
    next();
  });
};

module.exports = isAuthenticated;