const { Router } = require("express");
const listRouter = require("./listRouter");
const booksRouter = require("./booksRouter");
const userRouter = require("./userRouter");

const router = Router();

router.use("/booklists", listRouter);
router.use("/books", booksRouter);
router.use("/user", userRouter);

module.exports = router;
