import { useState, useEffect } from "react";

export default function NoteModal({
  isOpen,
  onClose,
  onSave,
  currentNote,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title ?? "");
      setContent(currentNote.content ?? currentNote.body ?? "");

      setTags(
        Array.isArray(currentNote.tags)
          ? currentNote.tags.join(", ")
          : ""
      );
    } else {
      setTitle("");
      setContent("");
      setTags("");
    }
  }, [currentNote, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      content: content.trim(), // Change to body if your backend expects body
      tags: tagsArray,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          {currentNote ? "Edit Note" : "Create New Note"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
              Title
            </label>

            <input
              type="text"
              placeholder="Give your note a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
              Content
            </label>

            <textarea
              rows={5}
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
              Tags
            </label>

            <input
              type="text"
              placeholder="work, personal, ideas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}