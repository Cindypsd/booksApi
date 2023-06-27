const axios = require('axios');
const { BookList, Book } = require('../db');
const { Op } = require('sequelize');
const { validateBookTitle } = require('../utils/validations');
require('dotenv').config();
const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

const createBookList = async (name) => {
  const existingList = await BookList.findOne({ where: { name } });
  if (existingList) throw new Error('List name is already registered');
  return await BookList.create({ name });
};

const getBookListByName = async (name) => {
  const bookList = await BookList.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: [
      {
        model: Book,
        as: 'books',
      },
    ],
  });
  return bookList;
};

const getAllBookLists = async () => {
  const allLists = await BookList.findAll({
    include: {
      model: Book,
      as: 'books',
    },
  });
  return allLists;
};

const deletedListByID = async (id) => {
  const existingList = await BookList.findByPk(id);

  if (!existingList) throw new Error('List not found');

  await BookList.destroy({
    where: {
      id: id,
    },
  });
};

const AddBookToList = async (bookId, listId, res) => {
  console.log('-> Informacion que me llega', bookId, listId);

  try {
    // Primero verificar que exista la lista
    const existingList = await BookList.findByPk(listId);
    if (!existingList) throw new Error('List not found');

    // Verificar si el libro ya está en la lista
    const isBookInList = await existingList.hasBook(bookId);
    if (isBookInList)
      throw new Error(`Book with ID: ${bookId} is already in the list`);

    /// Verificar si el libro existe en la base de datos
    const bookInDB = await Book.findByPk(bookId);
    if (bookInDB) {
      await bookInDB.addBookList(existingList);
      return res
        .status(200)
        .json(
          `Book '${bookInDB.dataValues.title}' to list '${existingList.dataValues.name}' DB`
        );
    } else {
      // Si no está en la base de datos, buscar en la API
      console.log('-> Buscando en la API ...');
      const bookFromApi = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`
      );

      if (!bookFromApi.data || !bookFromApi.data.volumeInfo) {
        throw new Error(`Book with ID: ${bookId} not found`);
      }

      const { id, volumeInfo } = bookFromApi.data;
      const { title, description, authors, categories } = volumeInfo;
      const createdBook = { title, id, description, authors, categories };

      // Agregar el libro a la base de datos y a la lista
      const bookToAdd = await Book.create(createdBook);
      await bookToAdd.addBookList(existingList);
      return res
        .status(200)
        .json(
          `Book '${bookToAdd.dataValues.title}' added to list '${existingList.dataValues.name}' API`
        );
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const removeBookFromList = async (bookId, listId) => {
  const bookList = await BookList.findByPk(listId);
  if (!bookList) throw new Error('Book list not found');

  const book = await Book.findByPk(bookId);
  if (!book) throw new Error('Book not found');

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
