const router = require("express").Router();

const setmore = require("./setmore_api");

router.use("/api", setmore);

module.exports = router;