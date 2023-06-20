const { BookList } = require("../db");

const createBookList = async (name) => await BookList.create({ name });

module.exports = {
  createBookList,
};
