import React from "react";
import TodoList from "../components/TodoList";
import { observer, inject } from "mobx-react";
import { StoreView, StoreActions } from "../stores";

const mapViewToProps = (view: StoreView) => ({
  todos: view.visibleTodos,
});

const mapActionsToProps = (actions: StoreActions) => ({
  toggleTodo: (id: number) => actions.toggleTodo(id),
removeTodo: (id: number) => actions.removeTodo(id)
});

// This can be replaced by a connect function
export default inject("store")(
  observer(({ store }) => <TodoList {...mapViewToProps(store.view)} {...mapActionsToProps(store.actions)} />)
);
