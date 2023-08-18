import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from '../components/Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText('Component testing is done with react-testing-library')
  //screen.debug(element)
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  // mock function as event handler
  const mockHandler = jest.fn()

  render( <Note note={note} toggleImportance={mockHandler} /> )

  // session is started to interact with rendered component
  const user = userEvent.setup()

  // test finds button based on the text and clicks it:
  const button = screen.getByText('make note not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
