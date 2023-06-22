const { Router } = require("express");
const { signupHandler } = require("../handlers/userHandlers");

const userRouter = Router();

const validateData = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ error: "Missing email" });
  if (!password) return res.status(400).json({ error: "Missing password" });
  next();
};

userRouter.post("/sign-up", validateData, signupHandler); // ☑️

//TODO ---> userRouter.post("/login", loginHandler);

module.exports = userRouter;
