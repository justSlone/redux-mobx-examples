import React from 'react'
import Todo from './Todo'
import { TodoItem } from '../stores/TodoSchema'
import { observer } from 'mobx-react'; 

export interface TodoListProps {
  todos: TodoItem[]  
  toggleTodo: (id: number)=> void
  removeTodo: (id: number)=> void
}

const TodoList: React.SFC<TodoListProps> = ({ todos, toggleTodo, removeTodo }) => (
  <ul>
    {todos.map(todo =>      
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => toggleTodo(todo.id)}
        onRemoveClick={() => removeTodo(todo.id)}
      />
    )}
  </ul>
)

// Not very happy about having to observe here, but it's because we don't derefernce the array
export default observer(TodoList)
