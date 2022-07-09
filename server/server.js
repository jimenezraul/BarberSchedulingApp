const path = require("path");
const express = require("express");
const port = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./api/"));
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).send(message);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is up! http://localhost:${port}`);
});
