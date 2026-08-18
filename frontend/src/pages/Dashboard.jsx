import { useEffect, useState } from 'react';
import { useNotes } from '../context/NotesContext';
import { useAuth } from '../context/AuthContext';
import NoteCard from '../components/ui/NoteCard';
import NoteModal from '../components/ui/NoteModal';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import { 
  Plus, 
  Search, 
  LogOut, 
  Grid, 
  List, 
  StickyNote, 
  Notebook, 
  AlertCircle, 
  CheckCircle2, 
  X 
} from 'lucide-react';
import VoiceButton from '../components/ui/VoiceButton';

export default function Dashboard() {
  const { notes, loading, fetchNotes, createNote, updateNote, deleteNote } = useNotes();
  const { user, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid | list

  // Modern Toast State: { show: boolean, message: string, type: 'error' | 'success' }
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

  // Auto-dismiss toast after 4 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const showNotification = (message, type = 'error') => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSaveNote = async (data) => {
    const rawTitle = data?.title?.trim() || '';
    const rawContent = (data?.content || data?.body || '').trim();

    // Trigger modern toast if completely empty
    if (!rawTitle && !rawContent) {
      showNotification('Note cannot be empty. Add some content or a title.', 'error');
      return;
    }

    // Default fallback values (Title and tags are optional)
    const notePayload = {
      ...data,
      title: rawTitle || 'Untitled Note',
      content: rawContent,
      tags: Array.isArray(data?.tags) ? data.tags : [],
    };

    try {
      if (selectedNote) {
        await updateNote(selectedNote._id, notePayload);
        showNotification('Note updated successfully!', 'success');
      } else {
        await createNote(notePayload);
        showNotification('Note created successfully!', 'success');
      }
      setIsModalOpen(false);
      setSelectedNote(null);
    } catch (err) {
      console.error("Error saving note to database:", err);
      showNotification(err?.message || 'Failed to save note. Please try again.', 'error');
    }
  };

  const handleOpenEdit = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const filteredNotes = notes.filter((note) => {
    const title = note.title?.toLowerCase() || '';
    const content = (note.content || note.body || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    const tagsMatch = note.tags?.some((tag) => tag.toLowerCase().includes(query));

    return title.includes(query) || content.includes(query) || tagsMatch;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans antialiased relative overflow-x-hidden">
      {/* 1. Global Navigation Bar */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="p-2 bg-indigo-900/30 rounded-xl border border-indigo-400/30 text-indigo-400">
              <Notebook className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Memos
            </span>
          </div>

          {/* Centered Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Search by title, keywords, or tags..." 
              className="w-full pl-10 pr-10 py-2 bg-slate-700 border border-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 rounded-xl focus:outline-none text-sm transition-all text-slate-200 placeholder-slate-400"
            />
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
              <VoiceButton onTranscript={(spokenText) => setSearchQuery(spokenText)} />
            </div>
          </div>

          {/* Profile Actions */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-300 hidden md:inline">Hi, {user?.name || 'User'}</span>
            <button 
              onClick={logout} 
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-900/30 rounded-xl transition-all duration-200" 
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">My Workspace</h1>
          <p className="text-sm text-slate-400 mt-1.5">Manage, compose, and safely filter your thoughts.</p>
        </div>

        {/* Toolbar Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mb-10">
          <div className="hidden md:block"></div>

          <div className="flex justify-center">
            <button 
              onClick={handleOpenCreate} 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 duration-150"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" /> Compose Note
            </button>
          </div>
            
          <div className="flex justify-center md:justify-end">
            <div className="border border-slate-700 bg-slate-800 shadow-sm rounded-xl p-1 flex items-center gap-0.5">
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-slate-700 text-indigo-400 font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                title="Switch to Grid layout"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-slate-700 text-indigo-400 font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                title="Switch to List layout"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Notes Grid / List */}
        {loading ? (
          <SkeletonLoader count={6} />
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-24 bg-slate-800 border border-slate-700 rounded-2xl max-w-xl mx-auto p-8 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-slate-700/60 flex items-center justify-center mx-auto mb-4 border border-slate-600">
              <StickyNote className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-slate-200 font-semibold text-base">No notes within this scope</p>
            <p className="text-xs text-slate-400 mt-1.5 max-w-xs mx-auto leading-relaxed">
              Try modifying your active query or click "Compose Note" above to register a new card entry.
            </p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" : "space-y-3.5 max-w-3xl mx-auto"}>
            {filteredNotes.map((note) => (
              <NoteCard 
                key={note._id} 
                note={note} 
                onEdit={handleOpenEdit} 
                onDelete={deleteNote} 
                onTogglePin={(id, pinState) => updateNote(id, { isPinned: pinState })}
              />
            ))}
          </div>
        )}
      </main>

      {/* 3. Footer */}
      <footer className="w-full bg-slate-800 border-t border-slate-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center py-4 sm:py-0 text-xs sm:text-sm font-medium text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Memos. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 4. Note Modal */}
      <NoteModal 
        isOpen={isModalOpen} 
        onClose={() => { 
          setIsModalOpen(false); 
          setSelectedNote(null); 
        }} 
        onSave={handleSaveNote} 
        currentNote={selectedNote} 
      />

      {/* 5. Modern Floating Toast Alert (Bottom Right) */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out transform ${
          toast.show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div 
          className={`flex items-start gap-3 p-4 rounded-2xl shadow-2xl backdrop-blur-md border max-w-sm w-full ${
            toast.type === 'error'
              ? 'bg-slate-900/95 border-rose-500/30 text-rose-200 shadow-rose-950/40'
              : 'bg-slate-900/95 border-emerald-500/30 text-emerald-200 shadow-emerald-950/40'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            )}
          </div>

          <div className="flex-1 text-sm font-medium leading-snug">
            {toast.message}
          </div>

          <button 
            onClick={() => setToast((prev) => ({ ...prev, show: false }))} 
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}