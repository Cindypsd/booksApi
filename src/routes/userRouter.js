const { Router } = require("express");
const { signupHandler } = require("../handlers/userHandlers");

const userRouter = Router();

userRouter.post("/sign-up", signupHandler);

module.exports = userRouter;
