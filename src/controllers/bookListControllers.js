const axios = require("axios");
const { BookList, Book } = require("../db");
const { Op } = require("sequelize");

const createBookList = async (name) => await BookList.create({ name });

const getBookListByName = async (name) => {
  const bookList = await BookList.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
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
  await BookList.destroy({
    where: {
      id: id,
    },
  });
};

const AddBookToList = async (bookId, listId) => {
  //TODO Aqui debe revisar que en Modelo Book no exista ya ese libro, si NO EXISTE consulta la API

  const bookFromApi = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyBJVShtsy8X7yAscQiYXSgorHaefdIlvLQ`
  );
  const { id, volumeInfo } = bookFromApi.data;
  const { title, description, authors, categories } = volumeInfo;
  const bookToAdd = { title, id, description, authors, categories };

  try {
    // Crea el libro en el modelo "Book" y busca la lista en el modelo "BookList"
    const createdBook = await Book.create(bookToAdd);
    const bookList = await BookList.findByPk(listId);

    // Agrega el libro a la lista utilizando la asociación definida en los modelos
    await createdBook.addBookList(bookList);

    return createdBook;
  } catch (error) {
    throw new Error("Failed to add book to list"); // Lanza un error si ocurre algún problema
  }
};

module.exports = {
  createBookList,
  getBookListByName,
  getAllBookLists,
  deletedListByID,
  AddBookToList,
};
