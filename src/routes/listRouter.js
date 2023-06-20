const { Router } = require("express");
const {
  getAllBookListHandler,
  createABookListHandler,
  deleteABookListHandler,
} = require("../handlers/bookListsHandlers");
const listsRouter = Router();

listsRouter.get("/", getAllBookListHandler);
listsRouter.post("/", createABookListHandler);
listsRouter.delete("/", deleteABookListHandler);

//// Ruta para crear listas
///// TODO:Ruta para obtener todas las listas
// TODO:Ruta para eliminar lista
// TODO: Ruta para eliminar un libro de la lista
// TODO: Ruta para agregar un libro a la lista

module.exports = listsRouter;
