const { Router } = require("express");
const {
  getAllBookListHandler,
  createABookListHandler,
  deleteABookListHandler,
  addBookToListHandler,
  removeBookToListHandler,
} = require("../handlers/bookListsHandlers");
const listsRouter = Router();

const validateUser = (req,res,next) => {
  //Middle para validar que sea un usuario registrado si no manda error
  // if(user no existe) res.status(400).json({error: "Usuario no registrado"})

  //next()
}

listsRouter.get("/", getAllBookListHandler);
listsRouter.post("/", createABookListHandler);
listsRouter.delete("/", deleteABookListHandler);
listsRouter.post("/:listId/add-book", addBookToListHandler);
listsRouter.delete("/:listId/remove-book/:bookId", removeBookToListHandler);

//// Ruta para crear listas
///// Ruta para obtener todas las listas
///// Ruta para eliminar lista
///// TODO: Ruta para eliminar un libro de la lista
///// TODO: Ruta para agregar un libro a la lista

module.exports = listsRouter;
