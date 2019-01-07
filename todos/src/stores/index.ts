import { TodoStore, TodoItem } from "./TodoStore";
import { FilterStore, VisibilityFilters } from "./FilterStore";
import { CreateStore, View, Actions, CreateStoreFactory } from './StoreHelper';
import { computed } from 'mobx';
import Todo from "../components/Todo";

export class StoreState {
  todoStore = new TodoStore()
  filterStore = new FilterStore()
}

export class StoreView extends View<StoreState> {

  // This is optional to reduce typing
  private filterState = this.state.filterStore.getState();
  private todoState = this.state.todoStore.getState();

  /* State */
  get visibilityFilter() {
    return this.filterState.visibilityFilter;
  }

  get todos() {
    return this.todoState.todos;
  }

  /* Computed */
  @computed
  get completedTodosCount() {
    return this.todoState.todos.filter((todo:any) => todo.completed).length;
  }

  /* Utility */
  get visibleTodos() {
    let state = this.todoState;
    switch (this.visibilityFilter) {
      case VisibilityFilters.SHOW_ALL:
        return state.todos;
      case VisibilityFilters.SHOW_COMPLETED:
        return state.todos.filter(t => t.completed);
      case VisibilityFilters.SHOW_ACTIVE:
        return state.todos.filter(t => !t.completed);
      default:
        throw new Error("Unknown filter: " + this.visibilityFilter);
    }
  }
}

export class StoreActions extends Actions<StoreState> {
  /* Actions */
  private _nextTodoId = 0;
  addTodo(text: string) {
    return this.state.todoStore.actions.addTodo({
      id: this._nextTodoId++,
      text
    });
  }
  toggleTodo = this.state.todoStore.actions.toggleTodo;
  removeTodo = this.state.todoStore.actions.removeTodo;
  setVisibilityFilter = this.state.filterStore.actions.setVisibilityFilter;
}

export class Store extends CreateStore(StoreState, StoreActions) { };

export { VisibilityFilters };
