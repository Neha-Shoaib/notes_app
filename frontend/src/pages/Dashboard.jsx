import { useEffect, useState } from 'react';
import { useNotes } from '../context/NotesContext';
import { useAuth } from '../context/AuthContext';
import NoteCard from '../components/ui/NoteCard';
import NoteModal from '../components/ui/NoteModal';
import SkeletonLoader from '../components/ui/SkeletonLoader';
import { Plus, Search, LogOut, Grid, List, StickyNote } from 'lucide-react';

export default function Dashboard() {
  const { notes, loading, fetchNotes, createNote, updateNote, deleteNote } = useNotes();
  const { user, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid | list

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSaveNote = async (data) => {
    try {
      if (selectedNote) {
        await updateNote(selectedNote._id, data);
      } else {
        await createNote(data);
      }
      setIsModalOpen(false);
      setSelectedNote(null); 
    } catch (err) {
      console.error("Error saving note to database:", err);
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

  const filteredNotes = notes.filter(note => {
    const title = note.title?.toLowerCase() || '';
    const content = (note.content || note.body || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    const tagsMatch = note.tags?.some(tag => tag.toLowerCase().includes(query));

    return title.includes(query) || content.includes(query) || tagsMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans antialiased">
      {/* 1. Global Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-500 text-white rounded-xl shadow-md shadow-indigo-600/10">
              <StickyNote className="w-5 h-5" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-lg hidden sm:inline">Memos</span>
          </div>

          {/* Centered Integrated Search Bar */}
          <div className="flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, keywords, or tags..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 focus:bg-white border border-transparent focus:border-slate-200 rounded-xl focus:outline-none text-sm transition-all text-slate-700 placeholder-slate-400 focus:shadow-sm"
            />
          </div>

          {/* Profile Actions */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600 hidden md:inline">Hi, {user?.name || 'User'}</span>
            <button 
              onClick={logout} 
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50/60 rounded-xl transition-all duration-200" 
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Workspace Greeting Title Header */}
        <div className='text-center mb-8'>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Workspace</h1>
          <p className="text-sm text-slate-500 mt-1.5">Manage, compose, and safely filter your thoughts.</p>
        </div>

        {/* 🛠️ Balanced Flex Toolbar Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mb-10">
          
          {/* Left spacer block to maintain symmetry on large viewports */}
          <div className="hidden md:block"></div>

          {/* Primary Call to Action Button (Perfect Center) */}
          <div className="flex justify-center">
            <button 
              onClick={handleOpenCreate} 
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-md shadow-indigo-600/20 active:scale-95 duration-150"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" /> Compose Note
            </button>
          </div>
            
          {/* Layout View Toggles (Centered on Mobile, Dropped Right on Desktop) */}
          <div className="flex justify-center md:justify-end">
            <div className="border border-slate-200 bg-white shadow-sm rounded-xl p-1 flex items-center gap-0.5">
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-slate-100 text-indigo-600 font-medium' : 'text-slate-400 hover:text-slate-600'}`}
                title="Switch to Grid layout"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-slate-100 text-indigo-600 font-medium' : 'text-slate-400 hover:text-slate-600'}`}
                title="Switch to List layout"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Operational Content Shell */}
        {loading ? (
          <SkeletonLoader count={6} />
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-24 bg-white border border-slate-200 rounded-2xl max-w-xl mx-auto p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <StickyNote className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-slate-700 font-semibold text-base">No notes within this scope</p>
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

      {/* 4. Integrated Dashboard Footer */}
   <footer className="w-full bg-white/80 backdrop-blur-md border-t border-slate-200 mt-auto">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-center py-4 sm:py-0 text-xs sm:text-sm font-medium text-slate-500">
    <div>
      &copy; {new Date().getFullYear()} Memos. All rights reserved.
    </div>
  </div>
</footer>

      {/* Note Form Modal Interceptor */}
      <NoteModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setSelectedNote(null); }} 
        onSave={handleSaveNote} 
        currentNote={selectedNote} 
      />
    </div>
  );
}