const { User } = require("../db");

const registerUser = async (email, password) => {
  const newUser = await User.create({ email, password });
  return newUser;
};

module.exports = {
  registerUser,
};
