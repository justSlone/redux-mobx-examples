import React from "react";
import TodoList from "../components/TodoList";
import { observer, inject } from "mobx-react";
import { Store } from "../stores";

const mapStoreToProps = (store: Store) => ({
  todos: store.visibleTodos,
  toggleTodo: (id: number) => store.toggleTodo(id),
  removeTodo: (id: number) => store.removeTodo(id)
});

// This can be replaced by a connect function
export default inject("store")(
  observer(({ store }) => <TodoList {...mapStoreToProps(store)} />)
);
