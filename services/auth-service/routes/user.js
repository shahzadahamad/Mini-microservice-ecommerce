const express = require("express");
const userRouter = express();
const userController = require("../controllers/user");

userRouter.post("/register", userController.userRegister);
userRouter.post("/login", userController.userLogin);

module.exports = userRouter;
