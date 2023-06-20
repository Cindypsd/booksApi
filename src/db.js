const { Sequelize } = require("sequelize");
const BookListModel = require("./models/BookList");
const BooksModel = require("./models/Books");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/googlebooks`,
  { logging: false }
);

BookListModel(sequelize);
BooksModel(sequelize);

const { BookList, Books } = sequelize.models;

BookList.belongsToMany(Books, { through: "BookListBooks", timestamps: false });
Books.belongsToMany(BookList, { through: "BookListBooks", timestamps: false });

module.exports = { sequelize, ...sequelize.models };
