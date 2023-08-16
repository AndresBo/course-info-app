import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { userEvent } from "@testing-library/user-event/dist/types/setup";
import Toggable from "../components/Toggable";

describe('<Toggable />', () => {
  let container
  // render Toggable and saves the field container of the return value
  beforeEach(() => {
    container = render(
      <Toggable buttonLabel="show...">
        <div className="testDiv" >
          toggable content
        </div>
      </Toggable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('toggable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.toggableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})
