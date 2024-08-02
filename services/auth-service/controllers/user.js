const User = require("../models/user");
const errorHandler = require("../utils/error");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// user registation
const userRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) return next(errorHandler(401, "User already exists"));
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    newUser.save();
    const { password: _, ...rest } = newUser.toObject();
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// user login
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));

    // Check if the entered password is valid.
    const valiedPassword = bcryptjs.compareSync(password, user.password);
    if (!valiedPassword) return next(errorHandler(401, "Invalied credentials"));

    const payload = {
      id: user.id,
      name: user.name,
      email,
    };

    jwt.sign(payload, "secret", (err, token) => {
      if (err) console.log(err);
      else return res.json({ token: token });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
};
