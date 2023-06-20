const { Router } = require("express");
const {
  getAllBookListHandler,
  createABookListHandler,
} = require("../handlers/bookListsHandlers");
const listsRouter = Router();

listsRouter.get("/", getAllBookListHandler);
listsRouter.post("/", createABookListHandler);

module.exports = listsRouter;
