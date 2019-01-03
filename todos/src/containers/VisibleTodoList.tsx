import React from "react";
import TodoList from "../components/TodoList";
import { observer, inject } from "mobx-react";
import { StoreView, StoreActions, Store } from "../stores";

const mapViewToProps = ({ view }: Store) => ({
  todos: view.visibleTodos
});

const mapActionsToProps = ({ actions }: Store) => ({
  toggleTodo: (id: number) => actions.toggleTodo(id),
  removeTodo: (id: number) => actions.removeTodo(id)
});

// This can be replaced by a connect function
export default inject("store")(
  observer(({ store }) => (
    <TodoList {...mapViewToProps(store)} {...mapActionsToProps(store)} />
  ))
);
