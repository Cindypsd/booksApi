const axios = require("axios");

const getBookByTitle = async (title) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&key=AIzaSyBJVShtsy8X7yAscQiYXSgorHaefdIlvLQ`
    );
    return response.data;
};

module.exports = {
    getBookByTitle
}