const { createBookList } = require("../controllers/bookListControllers");
const BookLists = require("../models/BookLists");


// const getBookList = (name) =>{
//     const bookList = BookLists
//     console.log(BookLists)
//     return bookList
// } 
 
const getAllBookListHandler = async (req, res) => {
    const {name} = req.query
    
    try {
        const booklists = await getBookList(name)
        name ? res.send(`Aqui voy a llamar a la funcion para obtner lista con nombre ${name}`) : 
        res.send(`Aqui aparecen todos las listas`)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};


const createABookListHandler = async (req, res) => {
  const { name } = req.body;
  try {
    const newList = await createBookList(name);
    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllBookListHandler,
  createABookListHandler,
};


// ApiKey = AIzaSyBJVShtsy8X7yAscQiYXSgorHaefdIlvLQ