import Note from '../models/Note.js';

// @desc    Get all notes for authenticated user
// @route   GET /api/notes
export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ isPinned: -1, updatedAt: -1 });
    res.status(200).json({ success: true, count: notes.length, data: notes });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new note
// @route   POST /api/notes
export const createNote = async (req, res, next) => {
  const { title, body, tags, isPinned } = req.body;
  try {
    const note = await Note.create({
      user: req.user._id,
      title,
      body,
      tags: tags || [],
      isPinned: isPinned || false,
    });
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a specific note
// @route   PUT /api/notes/:id
export const updateNote = async (req, res, next) => {
  try {
    // Explicitly find note by both note ID and matching ownership ID
    let note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
      res.status(404);
      throw new Error('Note not found, or user unauthorized');
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a specific note
// @route   DELETE /api/notes/:id
export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
      res.status(404);
      throw new Error('Note not found, or user unauthorized');
    }

    await note.deleteOne();
    res.status(200).json({ success: true, message: 'Note cleanly removed' });
  } catch (error) {
    next(error);
  }
};