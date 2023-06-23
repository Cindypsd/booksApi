const axios = require("axios");
const { BookList, Book } = require("../db");
const { Op } = require("sequelize");

const createBookList = async (name) => {
  const existingList = await BookList.findOne({ where: { name } });
  if (existingList) throw new Error("List name is already registered");
  return await BookList.create({ name });
};

const getBookListByName = async (name) => {
  const bookList = await BookList.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: [
      {
        model: Book,
        as: "books",
      },
    ],
  });
  return bookList;
};

const getAllBookLists = async () => {
  const allLists = await BookList.findAll({
    include: {
      model: Book,
      as: "books",
    },
  });
  return allLists;
};

const deletedListByID = async (id) => {
  const existingList = await BookList.findByPk(id);

  if (!existingList) throw new Error("List not found");

  await BookList.destroy({
    where: {
      id: id,
    },
  });
};

const AddBookToList = async (bookId, listId) => {
  const existingList = await BookList.findByPk(listId);
  if (!existingList) throw new Error("List not found");

  try {
    const existingBook = await Book.findByPk(bookId);
    let bookToAdd;

    if (existingBook) {
      bookToAdd = await Book.create(existingBook);
    } else {
      const bookFromApi = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyBJVShtsy8X7yAscQiYXSgorHaefdIlvLQ`
      );
      const { id, volumeInfo } = bookFromApi.data;
      const { title, description, authors, categories } = volumeInfo;
      const createdBook = { title, id, description, authors, categories };
      bookToAdd = await Book.create(createdBook);
    }

    await bookToAdd.addBookList(existingList);

    return bookToAdd;
  } catch (error) {
    throw new Error("Failed to add book to list");
  }
};

const removeBookFromList = async (bookId, listId) => {
  const bookList = await BookList.findByPk(listId);
  if (!bookList) throw new Error("Book list not found");

  const book = await Book.findByPk(bookId);
  if (!book) throw new Error("Book not found");

  await bookList.removeBook(book);

  return book;
};

module.exports = {
  createBookList,
  getBookListByName,
  getAllBookLists,
  deletedListByID,
  AddBookToList,
  removeBookFromList,
};
