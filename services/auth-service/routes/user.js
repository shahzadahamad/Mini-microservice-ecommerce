const express = require("express");
const userRouter = express();
const userController = require("../controllers/user");

userRouter.post("/auth/register", userController.userRegister);
userRouter.post('/auth/login', userController.userLogin);

module.exports = userRouter;