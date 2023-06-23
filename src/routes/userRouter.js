const { Router } = require("express");
const { signupHandler, loginHandler } = require("../handlers/userHandlers");
const { validateUserData } = require("../utils/validations");

const userRouter = Router();

userRouter.post("/sign-up", validateUserData, signupHandler); // ☑️
userRouter.post("/login", validateUserData, loginHandler);

//TODO ---> userRouter.post("/login", loginHandler);

module.exports = userRouter;
