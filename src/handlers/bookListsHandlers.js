const { createBookList } = require("../controllers/bookListControllers");


const getAllBookListHandler = (req, res) => {
  res.status(200).send('aqui van todas mis listas');
};

const createABookListHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const newList = await createBookList(name);
    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllBookListHandler,
  createABookListHandler,
};
