import { useState } from "react"

// Note how this component is used to wrap a 'child' component, defined
// by {props.children} and give them visibility toogling functionality. 
// Note child components are always added by React. If a component is defined like this: <Note ... />, 
// props.children is an empty array. Toggable will use opening AND closing tags: <Toggable> ..
// </Toggable> to allow child components inside.
const Toggable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible? 'none' : '' }
  const showWhenVisible = { display: visible? '' : 'none' }

  const toogleVisibility = () => setVisible(!visible)

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toogleVisibility}>{props.buttonLabel}</button>
      </div>
      <div>
        <div style={showWhenVisible}>
          {props.children}
          <button onClick={toogleVisibility}>calce</button>
        </div>
      </div>
    </div>
  )
}

export default Toggable
