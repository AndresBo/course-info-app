import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// Note how this component is used to wrap a 'child' component, defined
// by {props.children} and give them visibility toogling functionality.
// Note child components are always added by React. If a component is defined like this: <Note ... />,
// props.children is an empty array. Toggable will use opening AND closing tags: <Toggable> ..
// </Toggable>, this allows child components inside.

// Note forwardRef that allows the component to access the ref assigned.
const Toggable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  // inline display css to determine visibility
  const hideWhenVisible = { display: visible? 'none' : '' }
  const showWhenVisible = { display: visible? '' : 'none' }

  const toogleVisibility = () => setVisible(!visible)
  // useImperativeHandle function is a hook to define functions in a component that can be invoked from outside
  // this component. This means we can use noteFormRef.current.toggleVisibility() from outside the component, to
  // trigger toogleVisibility()
  useImperativeHandle(refs, () => {
    return { toogleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toogleVisibility}>{props.buttonLabel}</button>
      </div>
      <div>
        <div style={showWhenVisible} className="toggableContent">
          {props.children}
          <button onClick={toogleVisibility}>cancel</button>
        </div>
      </div>
    </div>
  )
})

// enforce button text must be given a value:
Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

// give display name to Toggable
Toggable.displayName = 'Toggable'


export default Toggable
