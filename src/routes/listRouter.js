const { Router } = require("express");
const {
  getAllBookListHandler,
  createABookListHandler,
  deleteABookListHandler,
  addBookToListHandler,
  removeBookToListHandler,
} = require("../handlers/bookListsHandlers");
const listsRouter = Router();

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Missing list name" });
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "Missing list ID" });
  next();
};

listsRouter.get("/", getAllBookListHandler); // ☑️
listsRouter.post("/", validateName, createABookListHandler); // ☑️
listsRouter.delete("/", validateId, deleteABookListHandler); // ☑️
listsRouter.post("/:listId/add-book", addBookToListHandler);
listsRouter.delete("/:listId/remove-book/:bookId", removeBookToListHandler);

module.exports = listsRouter;
