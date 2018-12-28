import React from 'react'
import { inject } from 'mobx-react'

const AddTodo = inject('store')(({ store }) => {
  let input
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }        
        store.actions.addTodo(input.value);        
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
