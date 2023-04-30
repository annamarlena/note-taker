const express = require('express');
const path = require("path");
const api = require("./api");
const fs = require("fs");

// application state
let db = require("./db.json");

const PORT = process.env.PORT || 3001;
const app = express();

// our static files and assets
app.use(express.static('client'));
// receive data 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.post("/api <insert route to wildcard :id here>")   <---- may be needed later ----------

app.use("/api", api);

// Create a homepage route that points to homepage.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'client/index.html'))
);


app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);