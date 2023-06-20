const { getBookByTitle } = require('../controllers/booksControllers');

const getBookByTitleHandler = async (req, res) => {
    const { title } = req.query;
    const books = await getBookByTitle(title);
  
    try {
      title ?
        res.json(books):
        res.status(200).send("¿Enviar todos los libros?");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = {
    getBookByTitleHandler
  }