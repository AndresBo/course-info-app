import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'

import './index.css'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  // Create new ref and assign it to Toggable component wrapping NoteForm. noteFormRef acts as
  // a reference to Toggable component.
  const noteFormRef = useRef()

  // useEffect fetches data from bd at first render. Well, actually the effect gets data after the first render
  // as the body of the function defining the component is executed and rendered first. Then axios.get initiates
  // the fetching and setting notes.
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  },[])

  // if notes is null (like in the first render), don't render anything/skip rest
  if (!notes) {
    return null
  }

  // note ref noteFormRef that has access to function toogleVisibility, inside of the Toggable component.
  const addNote = (noteObject) => {
    noteFormRef.current.toogleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
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
      .catch( () => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  // sends HTTP POST request to server address 'api/login'
  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      // save logged in user details to local storage
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      // call method that set the token for future request by the logged in user
      noteService.setToken(user.token)
      // on sucess, save server response (token, user details) to user field of the app state
      setUser(user)

    } catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user &&
        <Toggable buttonLabel='log in'>
          <LoginForm
            handleSubmit={handleLogin}
          />
        </Toggable>}
      {user && <div>
        <p>{user.name} logged in</p>
        <Toggable buttonLabel="new note" ref={noteFormRef}>
          <NoteForm createNote={addNote} />
        </Toggable>
      </div>
      }

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
    </div>
  )
}

export default App
