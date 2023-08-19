import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NoteForm from '../components/NoteForm'
import userEvent from '@testing-library/user-event'
import { TestEnvironment } from 'jest-environment-jsdom'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  // mock function for the event handler
  const createNote = jest.fn()
  // session started to interact with rendered component
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />)

  const input = screen.getByRole('textbox')
  const sendButton = screen.getByText('save')
  // method 'type' of userEvent used to write to the input field
  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  // check createNote is called when form is submitted
  expect(createNote.mock.calls).toHaveLength(1)
  // check event handler is called with the right parameters
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
