import { Pin, Trash2, Edit3, Tag } from 'lucide-react';

export default function NoteCard({ note, onEdit, onDelete, onTogglePin }) {
  // Safe extraction with dynamic fallback in case your backend uses either body or content
  const noteContent = note.content || note.body || "";

  return (
    <div className={`group relative bg-white p-5 rounded-xl border border-slate-200 hover:border-indigo-200 transition-all duration-200 hover:shadow-md flex flex-col justify-between dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600 ${note.isPinned ? 'ring-1 ring-indigo-500/30 bg-indigo-50/10 dark:ring-indigo-400/30 dark:bg-indigo-900/20' : ''}`}>
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors dark:text-slate-100 dark:group-hover:text-indigo-400">
            {note.title || "Untitled Note"}
          </h3>
          <button 
            onClick={() => onTogglePin && onTogglePin(note._id, !note.isPinned)}
            className={`p-1 rounded hover:bg-slate-100 transition-colors ${note.isPinned ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity dark:text-slate-500'}`}
          >
            <Pin className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
        
        {/* FIX: Changed {note.body} to noteContent so it safely reads either 'content' or 'body' */}
         <p className="text-sm text-slate-600 whitespace-pre-wrap break-words leading-relaxed mb-4 dark:text-slate-300">
          {noteContent || <span className="text-slate-400 italic dark:text-slate-500">No content</span>}
        </p>
      </div>

      <div>
        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {note.tags.map((tag, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-600 rounded-md dark:bg-slate-700 dark:text-slate-300">
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity pt-2 border-t border-slate-50 dark:border-t-slate-700">
          <button 
            onClick={() => onEdit && onEdit(note)} 
            className="p-1.5 text-slate-600 hover:text-indigo-600 rounded hover:bg-slate-100 dark:text-slate-400 dark:hover:text-indigo-400 dark:hover:bg-slate-700"
            title="Edit Note"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete && onDelete(note._id)} 
            className="p-1.5 text-slate-600 hover:text-rose-600 rounded hover:bg-slate-100 dark:text-slate-400 dark:hover:text-rose-400 dark:hover:bg-slate-700"
            title="Delete Note"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}