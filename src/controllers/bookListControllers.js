const { BookList } = require("../db");
const { Op } = require("sequelize");

const createBookList = async (name) => await BookList.create({ name });

const getBookListByName = async (name) => {
  const bookList = await BookList.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
  });
  return bookList;
};

const getAllBookLists = async () => {
  const allLists = await BookList.findAll();
  return allLists;
};

const deletedListByID = async (id) => {
  await BookList.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  createBookList,
  getBookListByName,
  getAllBookLists,
  deletedListByID,
};
