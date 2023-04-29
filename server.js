const express = require('express');
const path = require("path");
const api = require("./api");

const PORT = process.env.PORT || 3001;
const app = express();

// Insert code here for our static files and assets
app.use(express.static('public'));

// Insert code here so we can receive data 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", api);

// Create a homepage route that points to homepage.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html')));


app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);