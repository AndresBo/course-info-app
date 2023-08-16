import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import Note from '../components/Note'
import { userEvent } from "@testing-library/user-event/dist/types/setup";

test ('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  // render function 
  render(<Note note={note} />)
  // object screen access the rendered component and gets the text
  const element = screen.getByText('Component testing is done with react-testing-library')
  
  // expects element to exist 
  expect(element).toBeDefined()
})

test ('clicking button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  // event handler is a mock function defined with jest
  const mockHandler = jest.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )
  // session started to interact with rendered component
  const user = userEvent.setup()
  // test finds button based on the text used by the rendered component
  const button = screen.getByText('make not important')
  // click method from userEvent library
  await user.click(button)
  // verify mockHandler was called only once
  expect(mockHandler.mock.calls).toHaveLength(1)
})
