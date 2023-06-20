const { getBookByTitleHandler } = require("../handlers/booksHandlers");
const { Router } = require("express");

const booksRouter = Router();

booksRouter.get("/", getBookByTitleHandler);

//// Ruta para obtener libro por titulo
// TODO: Ruta para guardar detalles de un libro

module.exports = booksRouter;
