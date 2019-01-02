import React from 'react'

export interface TodoProps {
  onClick: ()=> void
  onRemoveClick: ()=>void
  completed?: boolean
  text: string
}

const Todo: React.SFC<TodoProps> = ({ onClick, onRemoveClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text} <span onClick={onRemoveClick} style={{color: 'red'}}>x</span>
  </li>
)

export default Todo
