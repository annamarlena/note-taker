const router = require("express").Router();

// Gets all the notes from the db.json file
// Loads up the json file and sends that data back as the response
router.get("/", (req, res) => {
  res.send("hello")
})

module.exports = router