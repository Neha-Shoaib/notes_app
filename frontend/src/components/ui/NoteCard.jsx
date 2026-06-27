import { Pin, Trash2, Edit3, Tag } from 'lucide-react';

export default function NoteCard({ note, onEdit, onDelete, onTogglePin }) {
  // Safe extraction with dynamic fallback in case your backend uses either body or content
  const noteContent = note.content || note.body || "";

  return (
    <div className={`group relative bg-white p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200 hover:shadow-sm flex flex-col justify-between ${note.isPinned ? 'ring-1 ring-indigo-500/30 bg-indigo-50/10' : ''}`}>
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {note.title || "Untitled Note"}
          </h3>
          <button 
            onClick={() => onTogglePin && onTogglePin(note._id, !note.isPinned)}
            className={`p-1 rounded hover:bg-slate-100 transition-colors ${note.isPinned ? 'text-indigo-600' : 'text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity'}`}
          >
            <Pin className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
        
        {/* FIX: Changed {note.body} to noteContent so it safely reads either 'content' or 'body' */}
        <p className="text-sm text-slate-600 whitespace-pre-wrap line-clamp-4 leading-relaxed mb-4">
          {noteContent || <span className="text-slate-400 italic">No content</span>}
        </p>
      </div>

      <div>
        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {note.tags.map((tag, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity pt-2 border-t border-slate-50">
          <button 
            onClick={() => onEdit && onEdit(note)} 
            className="p-1.5 text-slate-500 hover:text-indigo-600 rounded hover:bg-slate-50"
            title="Edit Note"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete && onDelete(note._id)} 
            className="p-1.5 text-slate-500 hover:text-rose-600 rounded hover:bg-slate-50"
            title="Delete Note"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}