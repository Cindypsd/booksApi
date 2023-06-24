const axios = require("axios");

const getBookByTitle = async (title) => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&key=AIzaSyCQXKm94XO4hU-gK5b4kXtAxPUHPlQrYds`
  );
  const books = response.data.items.map((item) => {
    const { id, volumeInfo } = item;
    const { title, description, authors, categories } = volumeInfo;
    return { title, id, description, authors, categories };
  });

  return books;
};

module.exports = {
  getBookByTitle,
};
