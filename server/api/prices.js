const router = require("express").Router();
const axios = require("axios");
const { get_access_token } = require("../utils/setmore");
require("dotenv").config();

const URL = "https://developer.setmore.com";

let access_token;
async function get_access_token_() {
  if (access_token) {
    return access_token;
  }
  const response = await get_access_token();
  if (response.error) {
    return response.error;
  }
  access_token = response;
  return access_token;
}

router.get("/", async (req, res) => {
  await get_access_token_();
  console.log(access_token);
  async function get_prices(token) {
    const endpoint = "/api/v2/bookingapi/services";
    const response = await axios.get(URL + endpoint, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (!response.data.response) {
      const newToken = await get_access_token();
      access_token = newToken;
      get_prices(newToken);
    }

    return res.send(response.data);
  }
  get_prices(access_token);
});

module.exports = router;
