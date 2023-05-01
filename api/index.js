const router = require("express").Router();

const notes = require("./notes");

// redirect all api traffic that is /api/notes to the notes file required above
router.use("/notes", notes);


module.exports = router;