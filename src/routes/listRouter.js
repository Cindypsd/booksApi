const { Router } = require("express");
const {
  getAllBookListHandler,
  createABookListHandler,
  deleteABookListHandler,
  addBookToListHandler,
  removeBookToListHandler,
} = require("../handlers/bookListsHandlers");
const listsRouter = Router();

listsRouter.get("/", getAllBookListHandler);
listsRouter.post("/", createABookListHandler);
listsRouter.delete("/", deleteABookListHandler);
listsRouter.post("/:listId", addBookToListHandler);
listsRouter.delete("/:listId/remove-book/:bookId", removeBookToListHandler);

//// Ruta para crear listas
///// Ruta para obtener todas las listas
///// Ruta para eliminar lista
///// TODO: Ruta para eliminar un libro de la lista
///// TODO: Ruta para agregar un libro a la lista

module.exports = listsRouter;
