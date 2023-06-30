import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Note from "./components/Note"
import noteService from './services/notes'
import Notification from "./components/Notification"
import './index.css'


const App = (props) => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  // useEffect fetches data from bd at first render. Well, actually the effect gets data after the first render
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  },[])

  // if notes is null (like in the first render), don't render anything/skip rest
  if (!notes) {
    return null
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: nanoid()
    }
    noteService 
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const toggleImportanceOf = id => {
    // find the note we want to modify and assign to note variable
    const note = notes.find(note => note.id === id)
    // create a new changedNote object, copying old note except important property, which is flipped. 
    // note that doing it this way we AVOID MUTATING the notes component state. Note that changedNote is
    // a shallow copy = if the value is a primitive, its copied to new object. But if value is an object, the
    // reference is copied so its shared between the copy and the original.  
    const changedNote = { ...note, important: !note.important }
    // send new object with a PUT request to the backend where it replaces original object.
    // with map method we create a new array with all original notes, expect the one to be replaced:
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id? note : returnedNote))
      })
      // when an error occurs add a descriptive error message to errorMessage state. and set a timer to
      // set errorMessage state to null after 5 seconds
      .catch(error => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </div>
    )
}

export default App
