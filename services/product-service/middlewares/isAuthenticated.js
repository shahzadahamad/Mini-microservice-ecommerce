const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return next(errorHandler(401, "Unauthorized"));

  const token = authHeader.split(" ")[1];

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, "secret", (err, user) => {
    if (err) return next(errorHandler(401, "You are not authenticated!"));
    req.user = user;
    next();
  });
};

module.exports = isAuthenticated;
