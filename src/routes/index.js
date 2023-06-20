const { Router } = require("express");
const listRouter = require("./listRouter");
const booksRouter = require("./booksRouter");

const router = Router();

router.use("/booklists", listRouter);
router.use("/books", booksRouter);

module.exports = router;
