const { Router } = require("express");
const { signupHandler, loginHandler, changePasswordHandler } = require("../handlers/userHandlers");
const { validateUserData } = require("../utils/validations");

const userRouter = Router();

userRouter.post("/sign-up", validateUserData, signupHandler);
userRouter.post("/login", validateUserData, loginHandler);
userRouter.patch("/change-password", validateUserData, changePasswordHandler);

module.exports = userRouter;
