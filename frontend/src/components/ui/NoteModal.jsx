import { useState, useEffect } from "react";
import VoiceButton from "./VoiceButton"; // Adjust path if VoiceButton is located elsewhere (e.g., './ui/VoiceButton')

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
      content: content.trim(),
      tags: tagsArray,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/80 flex items-center justify-center p-4 z-50 dark:bg-slate-950/90">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl shadow-slate-200/60 border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
        <h2 className="text-lg font-bold text-slate-800 mb-4 dark:text-slate-100">
          {currentNote ? "Edit Note" : "Create New Note"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 dark:text-slate-400">
              Title
            </label>

            <input
              type="text"
              placeholder="Give your note a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:border-indigo-400"
            />
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">
                Content
              </label>
              <VoiceButton
                onTranscript={(spokenText) =>
                  setContent((prev) =>
                    prev ? `${prev} ${spokenText}` : spokenText
                  )
                }
              />
            </div>

            <textarea
              rows={6}
              placeholder="What's on your mind? Type or click the mic to speak..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg resize-none focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-1 dark:text-slate-400">
              Tags
            </label>

            <input
              type="text"
              placeholder="work, personal, ideas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:border-indigo-400"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}