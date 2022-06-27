const axios = require("axios");
const url = "https://developer.setmore.com";

module.exports = {
  get_access_token: async () => {
    const link = "/api/v2/o/oauth2/token?refreshToken=";
    const response = await axios(url + link + process.env.SETMORE_API_KEY, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.response) {
        const data = await response.data.data.token.access_token;
      return data;  
    }

    return {
      error: "Something went wrong",
    };
  },
};

