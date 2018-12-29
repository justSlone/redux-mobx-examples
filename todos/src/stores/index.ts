import { TodoStore } from "./TodoStore";
import { FilterStore, VisibilityFilters } from "./FilterStore";
import { computed } from "mobx";

export class Store {
  constructor() {}
  todoStore = new TodoStore();
  filterStore = new FilterStore();

  /* State */
  get visibilityFilter() {
    return this.filterStore.visibilityFilter;
  }
  get todos() {
    return this.todoStore.todos;
  }
  get completedTodosCount() {
    return this.todoStore.completedTodosCount;
  }

  @computed
  get visibleTodos() {
    switch (this.visibilityFilter) {
      case VisibilityFilters.SHOW_ALL:
        return this.todos;
      case VisibilityFilters.SHOW_COMPLETED:
        return this.todos.filter(t => t.completed);
      case VisibilityFilters.SHOW_ACTIVE:
        return this.todos.filter(t => !t.completed);
      default:
        throw new Error("Unknown filter: " + this.visibilityFilter);
    }
  }

  /* Actions */
  private _nextTodoId = 0;
  addTodo(text) {
    return this.todoStore.addTodo({
      id: this._nextTodoId++,
      text
    });
  }
  toggleTodo = this.todoStore.toggleTodo;
  removeTodo = this.todoStore.removeTodo;
  setVisibilityFilter = this.filterStore.setVisibilityFilter;
}

export { VisibilityFilters };
