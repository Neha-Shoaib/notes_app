const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const auth = require("../middlewares/auth");

// ➤ GET all notes
router.get("/all", auth, async (req, res) => {
  const notes = await Note.find({user: req.user.id });
  res.json(notes);
});

// ➤ CREATE note
router.post("/create", auth, async (req, res) => {
  try {
    const newNote = new Note({
      text: req.body.text,
      user: req.user.id
    });

    const saved = await newNote.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➤ DELETE note
router.delete("/:id", async (req, res) => {
  try{
   const note = Note.findById(req.params.id);
   if(!note){
    res.status(405).json({message: "note not found"});
   }
   if(!note.user.toString() == note.user.id){
    res.status(405).json("you are not allowed to do that");
   }
   await note.deleteOne();
   res.json({message: "note deleted successfully"});
  }catch(err){
     res.status(500).json(err);
  }
});

// update note 
router.put("/update/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    note.title = req.body.title;
    note.content = req.body.content;

    await note.save();

    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;