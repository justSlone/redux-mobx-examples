import { TodoStore, TodoItem } from "./TodoStore";
import { FilterStore, VisibilityFilters } from "./FilterStore";
<<<<<<< HEAD
import {CreateStore, View, Actions, CreateStoreFactory } from './StoreHelper';
import { computed } from "mobx";
=======
import { CreateStore, View, Actions, CreateStoreFactory } from './StoreHelper';
import { computed } from 'mobx';
>>>>>>> d4ae3bd7da1657d7e9dcae62e269337ab23f1eb5

export class StoreState {
  todoStore = new TodoStore();
  filterStore = new FilterStore();
}

export class StoreView extends View<StoreState> {
  /* State */
  get visibilityFilter() {
    return this.state.filterStore.view.visibilityFilter;
  }

  get todos() {
    return this.state.todoStore.view.todos;
  }

  /* Computed */
  @computed
<<<<<<< HEAD
  get completedTodosCount() {    
=======
  get completedTodosCount() {
>>>>>>> d4ae3bd7da1657d7e9dcae62e269337ab23f1eb5
    return this.state.todoStore.view.completedTodosCount;
  }

  /* Utility */
  get visibleTodos(): TodoItem[] {
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

export class Store extends CreateStore(StoreState, StoreView, StoreActions) { };

export { VisibilityFilters };
