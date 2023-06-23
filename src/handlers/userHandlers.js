const { registerUser , changePassword} = require("../controllers/userControllers");
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

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Email is not registered");
    if (user.password !== password) throw new Error("Wrong password");

    jwt.sign({ user }, "secretkey", (err, token) => {
      res.json({
        token,
      });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePasswordHandler = async (req,res) => {
  const { email, password, newpassword } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Email is not registered");
    if (user.password !== password) throw new Error("Wrong password");

    await changePassword(user, newpassword);
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  signupHandler,
  loginHandler,
  changePasswordHandler
};
