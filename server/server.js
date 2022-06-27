const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(publicPath));

app.use(require("./api/"));

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});
app.listen(port, () => {
   console.log(`Server is up! http://localhost:${port}`);
});