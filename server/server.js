const path = require("path");
const express = require("express");
const port = process.env.PORT || 3001;
const { expressjwt: expressJwt } = require("express-jwt");
const jwks = require("jwks-rsa");
require("dotenv").config();

const publicPath = path.join(__dirname, "..", "build");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const jwtCheck = expressJwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URI,
  }),
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
  algorithms: [process.env.ALGORITHMS],
}).unless({ path: ["/api/gallery", "/api/all-services", "/index.html"] });

app.use(jwtCheck);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(publicPath));

app.use(require("./api/"));
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).send(message);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});
app.listen(port, () => {
  console.log(`Server is up! http://localhost:${port}`);
});
