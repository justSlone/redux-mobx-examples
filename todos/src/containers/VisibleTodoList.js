import React from "react";
import TodoList from "../components/TodoList";
import { observer } from "mobx-react";
import { VisibilityFilters } from "../stores/OptionsStore";
import { todoStore, optionsStore } from "../stores";


const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStoreToProps = store => ({
  todos: getVisibleTodos(store.state, optionsStore.state.visibilityFilter),
  toggleTodo: id => store.toggleTodo(id)
});

export default observer(() => <TodoList {...mapStoreToProps(todoStore)} />);
