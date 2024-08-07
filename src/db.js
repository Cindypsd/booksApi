const { Sequelize } = require("sequelize");
const BookListModel = require("./models/BookList");
const BooksModel = require("./models/Book");
const UserModel = require("./models/User");
require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/googlebooks`,
  { logging: false }
);

BookListModel(sequelize);
BooksModel(sequelize);
UserModel(sequelize);

const { BookList, Book, User } = sequelize.models;

BookList.belongsToMany(Book, {
  through: "BookListBooks",
  timestamps: false,
  as: "books",
});
Book.belongsToMany(BookList, { through: "BookListBooks", timestamps: false });

module.exports = { sequelize, ...sequelize.models };
