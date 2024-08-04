const express = require("express");
const userRouter = express();
const userController = require("../controllers/user");

userRouter.post("/register", userController.userRegister);
userRouter.post("/login", userController.userLogin);
userRouter.post('/get-all-user', userController.getAllUser);

module.exports = userRouter;
