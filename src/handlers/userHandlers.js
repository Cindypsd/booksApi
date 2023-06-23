const { registerUser } = require("../controllers/userControllers");
const { User } = require("../db");
const jwt = require("jsonwebtoken");

const signupHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await registerUser(email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Email is not registered");
  if (user.password !== password) throw new Error("Wrong password");

  try {
    jwt.sign({ user }, "secretkey", (err, token) => {
      res.json({
        token,
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupHandler,
  loginHandler,
};
