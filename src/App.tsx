import { useState, useEffect } from "react"
import type { Note } from "./types"
import NoteForm from './components/NoteForm';
import { GetNotes, CreateNote, UpdateNote, DeleteNote} from "./components/NoteServices";
import"./App.css"



function App() {
    const [notes,setNotes] = useState<Note[]>([])
    const [editNote,setEditNote] = useState<Note|null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [isDarkTheme, setDarkTheme] = useState(false)


    const fetchNotes = async() =>{
      const data = await GetNotes();
      setNotes(data);
    }

    useEffect(()=>{
      fetchNotes()
       //theme load
        const savedTheme = localStorage.getItem('theme')
        if(savedTheme==='dark'){
          setDarkTheme(true)
          document.body.classList.add('dark-theme')
        }
    }, []);

   

    /**ADD */
    const handleAdd = async (note : Omit<Note, "id"> ) =>{
      await CreateNote(note)
      fetchNotes()
    }
    /**Update */
    const handleUpdate = async(note: Note) =>{
      await UpdateNote(note)
      setEditNote(null)
      fetchNotes()
    }

    /**Delete */
    const handleDelete = async (id: number)=>{
      await DeleteNote(id)
      fetchNotes()
    }

    // theme toggle
    const toggleTheme = ()=>{
      setDarkTheme(!isDarkTheme)
      if (!isDarkTheme) {
        document.body.classList.add('dark-theme')
        localStorage.setItem('theme','dark-theme')
      }else{
        document.body.classList.remove('dark-theme')
        localStorage.setItem('theme','light-theme')
      }
    }

    //filter(pencarian)
    const filteredNotes = notes.filter(note=>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.note.toLowerCase().includes(searchQuery.toLowerCase())
    )
  return (
    <>
    
      <header>
        <div className="header-left">
          <div className="app-logo">Notes</div>
        </div>
        <div className="search-bar">
          <input type="text"
          placeholder="Cari catatan? ......" 
          value={searchQuery}
          onChange={ (e)=>setSearchQuery(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>{isDarkTheme ? '☀️' : '🌙'}</button>
      </header>
    <div className="app">
    <NoteForm
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      editNote={editNote}
    />
  {filteredNotes.length===0 && searchQuery &&(
    <div className="empety-state">
      <div className="empety-state-icon">
        <p>tidak ada data</p>
      </div>
    </div>
  )}
    {filteredNotes.length === 0 && !searchQuery && notes.length ===0 &&(
    <div className="empety-state">
      <div className="empety-state-icon">
        <p>belum ada catatan. Buat catatan pertamamu!</p>
      </div>
    </div>
  )}


     <div className="note-grid">
        {filteredNotes.map((note) => (
          <div key={note.id} className="note-card">
            <div className="note-title">{note.title}</div>
            <div>{note.note}</div>

            <div className="note-actions">
              <button onClick={() => setEditNote(note)} title="Edit">✏️</button>
              <button onClick={() => handleDelete(note.id)} title="Hapus">🗑️</button>
            </div>
          </div>
        ))}
      </div>
  </div>
    </>
  )
}

export default App
