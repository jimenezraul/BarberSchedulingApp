const router = require("express").Router();

const prices = require("./prices");

router.use("/api/prices", prices);

module.exports = router;