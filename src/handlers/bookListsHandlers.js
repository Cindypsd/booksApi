const { createBookList, getBookListByName, getAllBookLists} = require("../controllers/bookListControllers");

const getAllBookListHandler = async (req, res) => {
  const { name } = req.query;

  const result = name ?
                  await getBookListByName(name):
                  await getAllBookLists();

  try {
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const createABookListHandler = async (req, res) => {
  const { name } = req.body;
  try {
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


// ApiKey = AIzaSyBJVShtsy8X7yAscQiYXSgorHaefdIlvLQ