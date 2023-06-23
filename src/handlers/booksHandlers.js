const { getBookByTitle } = require("../controllers/booksControllers");

const getBookByTitleHandler = async (req, res) => {
  const { title } = req.query;

  try {
    const books = await getBookByTitle(title);
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBookByTitleHandler,
};
