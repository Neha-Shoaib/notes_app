import { useState, useEffect } from 'react';
import axios from 'axios';
function App(){
  const [text, setText] = useState("");
  const [notes, setnotes] = useState([]);
 
  const API = "http://localhost:5000/api/notes";

  // Get notes 
  const fetchNotes = async () =>{
    const res = await axios.get(API);
    setnotes(res.data);
  }

}
export default App
