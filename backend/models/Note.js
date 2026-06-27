import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    isPinned: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    
    // 🔒 CRITICAL: Connects the note to a specific user id
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, 
    },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);
export default Note;