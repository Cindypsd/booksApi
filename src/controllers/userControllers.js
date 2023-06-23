const { User } = require("../db");

const registerUser = async (email, password) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("Email is already registered");

  const newUser = await User.create({ email, password });
  return newUser;
};

const changePassword = async (user,newpassword) => {
  user.password = newpassword;
  await user.save();
}

module.exports = {
  registerUser,
  changePassword
};
