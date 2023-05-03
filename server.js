const express = require('express');
const path = require("path");
const fs = require("fs");
const notesData = require("./db/db.json")
const uuid = require("./helpers/uuid");
let newNote = {}

const PORT = process.env.PORT || 3001;
const app = express();

// our static files and assets
app.use(express.static('public'));

// receive data 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", (req, res) => {
  res.json(notesData)
})

app.get("/api/notes", (req, res) => 
fs.readFile("./db/db.json", "utf8", (err, data) => {
  if(err) return console.log(err);
  console.log(data)
  res.json(JSON.parse(data))
}))

// POST request to add a note
// NOTE: Data persistence isn't set up yet, so this will only exist in memory until we implement it
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if(err) return console.log(err);
      console.log(data)
      let notes = JSON.parse(data)
      notes.push(newNote)
      const noteString = JSON.stringify(notes);   
      // Write the string to a file
      fs.writeFile(`./db/db.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for ${newNote.title} has been written to JSON file`
          )
      );

      res.json(notes);
      const response = {
        status: 'success',
        body: newNote,
      };
    })

    console.log(response);
  
  } else {
    res.status(500).json('Error in posting review');
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// GET request for notes
app.get('/api/notes', (req, res) => {
  // Send a message to the client
  res.json(`${req.method} request received to get reviews`);

  // Log our request to the terminal
  console.info(`${req.method} request received to get reviews`);
});


// Create a homepage route that points to index.html
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Create a route that points to notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

const response = {
  status: 'success',
  body: newNote,
};

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if(err) return console.log(err);
    console.log(data)
    let notes = JSON.parse(data)
    let filteredNotes = notes.filter((note) => note.id != req.params.id)
    console.log(filteredNotes)
    fs.writeFile(`./db/db.json`, JSON.stringify(filteredNotes), (err) =>
    err
      ? console.error(err)
      : console.log(
          `Review for ${newNote.title} has been written to JSON file`
        )
    );
    res.json(filteredNotes);
  })
})
