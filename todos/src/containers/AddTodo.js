import React from 'react'
import { inject } from 'mobx-react'
import { addTodoCreator } from '../stores/TodoStore'

const AddTodo = inject('todoStore')(({ todoStore }) => {
  let input
  let addTodo = addTodoCreator(todoStore);
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }        
        addTodo(input.value);        
        input.value = ''
      }}>
        <input ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
});

export default (AddTodo)
