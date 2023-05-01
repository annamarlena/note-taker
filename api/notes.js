const router = require("express").Router();
const notesData = require("../db/db.json")

// Gets all the notes from the db.json file
// Loads up the json file and sends that data back as the response
router.get("/", (req, res) => {
  res.status(200).json({ status: "success", data: notesData })
})

module.exports = router;