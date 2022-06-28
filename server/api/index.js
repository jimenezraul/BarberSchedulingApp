const router = require("express").Router();

const setmore = require("./setmore");

router.use("/api", setmore);

module.exports = router;