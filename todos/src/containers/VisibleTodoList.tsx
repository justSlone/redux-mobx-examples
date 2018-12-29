import React from "react";
import TodoList from "../components/TodoList";
import { observer, inject } from "mobx-react";

const mapStoreToProps = store => ({
  todos: store.visibleTodos,
  toggleTodo: id => store.toggleTodo(id),
  removeTodo: id => store.removeTodo(id)
});

// This can be replaced by a connect function
export default inject("store")(
  observer(({store}) => (
    <TodoList
      {...mapStoreToProps(store)}      
    />
  ))
);
