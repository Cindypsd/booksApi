const { getBookByTitleHandler } = require('../handlers/booksHandlers');
const { validateBookTitle } = require('../utils/validations');
const { Router } = require('express');

const booksRouter = Router();

booksRouter.get('/search', validateBookTitle, getBookByTitleHandler);

module.exports = booksRouter;
