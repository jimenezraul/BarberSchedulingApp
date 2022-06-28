const axios = require("axios");
const url = "https://developer.setmore.com";
require("dotenv").config();

class Setmore {
  constructor() {
    this.access_token = null;
  }

  async get_access_token() {
    if (this.access_token) {
      return this.access_token;
    }
    await this.get_new_access_token();
    return this.access_token;
  }

  async get_new_access_token() {
    const link = "/api/v2/o/oauth2/token?refreshToken=";
    const response = await axios(url + link + process.env.SETMORE_API_KEY, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.response) {
      const data = await response.data.data.token.access_token;
      this.access_token = data;
      return data;
    }
    return response.data.error;
  }

  async get_services() {
    const access_token = await this.get_access_token();

    async function prices(token) {
      try {
        const endpoint = "/api/v2/bookingapi/services";
        const response = await axios.get(url + endpoint, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (!response.data.response) {
          const newToken = await this.get_new_access_token();
          access_token = newToken;
          return await get_prices(newToken);
        }

        const data = response.data.data.services;

        return data;
      } catch (error) {
        return error;
      }
    }
    return await prices(access_token);
  }

  async get_categories() {
    const access_token = await this.get_access_token();

    async function categories(token) {
      try {
        const endpoint = "/api/v1/bookingapi/services/categories";
        const response = await axios.get(url + endpoint, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (!response.data.response) {
          const newToken = await this.get_new_access_token();
          access_token = newToken;
          return await categories(newToken);
        }

        const data = response.data.data;
        return data;
      } catch (error) {
        return error;
      }
    }
    return await categories(access_token);
  }
}

module.exports = Setmore;
