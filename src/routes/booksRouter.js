const { getBookByTitleHandler } = require("../handlers/booksHandlers");
const { Router } = require("express");

const booksRouter = Router();

booksRouter.get("/", getBookByTitleHandler);

module.exports = booksRouter;
