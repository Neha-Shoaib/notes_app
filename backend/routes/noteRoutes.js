const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// ➤ GET all notes
router.get("/", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// ➤ CREATE note
router.post("/", async (req, res) => {
  try {
    const newNote = new Note({
      text: req.body.text,
    });

    const saved = await newNote.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ DELETE note
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

module.exports = router;