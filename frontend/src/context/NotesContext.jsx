import { createContext, useContext, useState } from 'react';
import { apiRequest } from '../utils/api';

const NotesContext = createContext(null);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. READ (Fetch all notes)
  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiRequest('/notes');
      // Ensure backend data exists before setting state
      if (res.success && res.data) {
        setNotes(res.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. CREATE (Add a brand new note)
  const createNote = async (noteData) => {
    setError(null);
    try {
      const res = await apiRequest('/notes', {
        method: 'POST',
        body: noteData,
      });
      
      // FIX: Use the actual note object returned by MongoDB (which contains the _id and default fields)
      if (res.success && res.data) {
        setNotes((prev) => [res.data, ...prev]);
      }
      return res;
    } catch (err) {
      setError(err.message);
      throw new Error(err.message);
    }
  };

  // 3. UPDATE (Edit content / Pin toggles)
  const updateNote = async (id, updatedData) => {
    setError(null);
    const originalNotes = [...notes];
    
    // Optimistic Update: Update UI instantly so app feels fast
    setNotes((prev) =>
      prev.map((note) => (note._id === id ? { ...note, ...updatedData } : note))
    );

    try {
      const res = await apiRequest(`/notes/${id}`, {
        method: 'PUT',
        body: updatedData,
      });

      // FIX: Sync state with the exact object returned from backend (captures server timestamps, etc.)
      if (res.success && res.data) {
        setNotes((prev) =>
          prev.map((note) => (note._id === id ? res.data : note))
        );
      }
      return res;
    } catch (err) {
      setNotes(originalNotes); // Rollback state if network layer fails
      setError(err.message);
      throw new Error(err.message);
    }
  };

  // 4. DELETE (Remove a note completely)
  const deleteNote = async (id) => {
    setError(null);
    const originalNotes = [...notes];
    
    // Optimistic Update: Delete instantly from screen layout
    setNotes((prev) => prev.filter((note) => note._id !== id));

    try {
      const res = await apiRequest(`/notes/${id}`, { 
        method: 'DELETE' 
      });

      // If server explicitly fails, force a local state rollback
      if (!res.success) {
        setNotes(originalNotes);
      }
      return res;
    } catch (err) {
      setNotes(originalNotes); // Rollback layout if network drops out
      setError(err.message);
      throw new Error(err.message);
    }
  };

  return (
    <NotesContext.Provider value={{ notes, loading, error, fetchNotes, createNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);