import { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [text, setText] = useState("");
  const [notes, setnotes] = useState([]);
 
  const API = "http://localhost:5000/api/notes";

  // Get notes 
 const fetchNotes = async () => {
  try {
    const res = await axios.get(API);
    console.log("DATA:", res.data); // DEBUG
    setnotes(res.data);
  } catch (error) {
    console.log("FETCH ERROR:", error.message);
  }
};
  // add note 
  const addNote = async ()=>{
    await axios.post(API, {text});
    setText("");
    fetchNotes();
  };

  // Delete note 
  const deleteNote = async (id) =>{
    await axios.delete(`${API}/${id}`);
    fetchNotes();
  };
  
  useEffect(()=>{
    fetchNotes();
  }, []);

  return(
    <div style={{padding: "20px"}}>
      <h1>Notes App</h1>
<input
value ={text}
onChange={(e) =>setText(e.target.value)}
placeholder='enter note'/>
  <button onClick={addNote}>Add</button>

  {notes.map((note) => (
    <div key={(note._id)}>
      {note.text}
       <button onClick={() => deleteNote(note._id)}>Delete</button>
    </div>
  ))}
      </div>
  );

}
export default App
