import React from 'react'
import ReactDOM from 'react-dom/client'
import { nanoid } from 'nanoid'
import axios from 'axios'

import App from './App'

// const promise = axios.get('http://localhost:3001/notes')
//                      .then(response => {
//                         const notes = response.data
//                         console.log(notes)
//                         console.log(response)
//                       })


// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)

// const notes = [
//   {
//     id: nanoid(),
//     content: 'HTML is easy',
//     important: true
//   },
//   {
//     id: nanoid(),
//     content: 'Browser can execute only JavaScript',
//     important: false
//   },
//   {
//     id: nanoid(),
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true
//   }
// ]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
