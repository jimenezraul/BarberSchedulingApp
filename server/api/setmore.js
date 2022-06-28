const router = require("express").Router();
const axios = require("axios");
const Setmore = require("../utils/setmore");

const setmore = new Setmore();

router.get("/services", async (req, res) => {
  try {
    const services = await setmore.get_services();
    return res.send(services);
  } catch (error) {
    res.send(error);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await setmore.get_categories();
    return res.send(categories);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
