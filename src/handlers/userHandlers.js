const { registerUser } = require("../controllers/userControllers");

const signupHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Llama a la función registerUser para registrar al usuario
    const newUser = await registerUser(email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupHandler,
};
