const axios = require("axios");
const { Book, BookList } = require("../db");
const {
  createBookList,
  getBookListByName,
  getAllBookLists,
  deletedListByID,
  AddBookToList,
} = require("../controllers/bookListControllers");

const createABookListHandler = async (req, res) => {
  const { name } = req.body;
  try {
    const newList = await createBookList(name);
    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllBookListHandler = async (req, res) => {
  const { name } = req.query;

  const result = name ? await getBookListByName(name) : await getAllBookLists();

  try {
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteABookListHandler = async (req, res) => {
  const { id } = req.body;

  //TODO Verificar que la lista exista
  if (!id) {
    res.status(400).json({ error: "Specify a book list to delete" });
    return;
  }

  try {
    await deletedListByID(id);
    res.status(200).json({ message: "Book list deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBookToListHandler = async (req, res) => {
  const { bookId } = req.body;
  const { listId } = req.params;

  //TODO Verificar que la lista y el libro exista

  try {
    const addedBook = await AddBookToList(bookId, Number(listId));
    res.status(201).json(addedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllBookListHandler,
  createABookListHandler,
  deleteABookListHandler,
  addBookToListHandler,
};

// ApiKey = AIzaSyBJVShtsy8X7yAscQiYXSgorHaefdIlvLQ
