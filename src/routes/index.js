const { Router } = require("express");
const listRouter = require("./listRouter");

const router = Router();

router.use("/booklists", listRouter);

module.exports = router;
