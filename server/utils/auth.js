const axios = require("axios");

const auth = async (req, res, next) => {
  // allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const response = await axios.get(`${process.env.ISSUER}userinfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userinfo = response.data;

    req.user = userinfo;
    next();
  } catch {
    console.log("Invalid token");
  }

  return req;
};

module.exports = auth;
