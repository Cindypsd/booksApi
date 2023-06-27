const { Router } = require('express');
const {
  getAllBookListHandler,
  createABookListHandler,
  deleteABookListHandler,
  addBookToListHandler,
  removeBookToListHandler,
} = require('../handlers/bookListsHandlers');
const { validateListId, validateListName } = require('../utils/validations');

const listsRouter = Router();

listsRouter.get('/', getAllBookListHandler); // ☑️
listsRouter.post('/', validateListName, createABookListHandler); // ☑️
listsRouter.delete('/', validateListId, deleteABookListHandler); // ☑️
listsRouter.post('/:listId/add-book', addBookToListHandler);
listsRouter.delete('/:listId/remove-book/:bookId', removeBookToListHandler);

module.exports = listsRouter;
