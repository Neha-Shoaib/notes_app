import express from 'express';
import Note from '../models/Note.js';
import { protect } from '../middleware/authMiddleware.js'; // 👈 Import your auth middleware

const router = express.Router();

// Apply protection middleware to ALL routes below this line
router.use(protect);

// 1. READ (Get ONLY the logged-in user's notes)
router.get('/', async (req, res, next) => {
  try {
    // 🔒 FIX: Query by { user: req.user._id } instead of fetching everything
    const notes = await Note.find({ user: req.user._id }).sort({ isPinned: -1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
});

// 2. CREATE (Attach user ID to the new note)
router.post('/', async (req, res, next) => {
  try {
    const { title, content, tags, isPinned } = req.body;

    // 🔒 FIX: Spread body and inject the logged-in user's ID explicitly
    const newNote = await Note.create({
      title,
      content,
      tags,
      isPinned,
      user: req.user._id, // 👈 Saved securely under ownership
    });

    res.status(201).json({
      success: true,
      data: newNote,
    });
  } catch (error) {
    next(error);
  }
});

// 3. UPDATE (Only modify if note belongs to the user)
router.put('/:id', async (req, res, next) => {
  try {
    // Find the note first to verify ownership
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error('Note not found.');
    }

    // 🔒 FIX: Check if the note's user ID matches the logged-in user's ID
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized to update this note.');
    }

    // Perform the update safely
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedNote,
    });
  } catch (error) {
    next(error);
  }
});

// 4. DELETE (Only remove if note belongs to the user)
router.delete('/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      throw new Error('Note not found.');
    }

    // 🔒 FIX: Check ownership before executing database deletion
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('User not authorized to delete this note.');
    }

    await note.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Note removed successfully.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;