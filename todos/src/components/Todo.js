import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, onRemoveClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text} <span onClick={onRemoveClick} style={{color: 'red'}}>x</span>
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
