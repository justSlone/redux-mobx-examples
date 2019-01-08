import { todoStore, todoActions,  TodoItem } from "./TodoStore";
import { FilterStore, VisibilityFilters } from "./FilterStore";
import {CreateStore, View, Actions, CreateStoreFactory } from './StoreHelper';
import { computed } from "mobx";

export class StoreState {
  todoStore: any 
  filterStore = new FilterStore();
}

export class StoreView extends View<StoreState> {
  /* State */
  get visibilityFilter() {
    return this.state.filterStore.view.visibilityFilter;
  }

  get todos() {
    return this.state.todoStore.todos;
  }

  /* Computed */
  @computed
  get completedTodosCount() {    
    return 0;
  }

  /* Utility */
  get visibleTodos(): any[] {
    switch (this.visibilityFilter) {
      case VisibilityFilters.SHOW_ALL:
        return this.todos;
      case VisibilityFilters.SHOW_COMPLETED:
        return this.todos.filter((t: any) => t.completed);
      case VisibilityFilters.SHOW_ACTIVE:
        return this.todos.filter((t: any) => !t.completed);
      default:
        throw new Error("Unknown filter: " + this.visibilityFilter);
    }
  }
}

export class StoreActions extends Actions<StoreState> {
  /* Actions */
  private _nextTodoId = 0;
  addTodo(text: string) {
    return todoActions.addTodo({
      id: this._nextTodoId++,
      text
    });
  }
  toggleTodo = todoActions.toggleTodo;
  removeTodo = todoActions.removeTodo;
  setVisibilityFilter = this.state.filterStore.actions.setVisibilityFilter;
}

export class Store extends CreateStore(StoreState, StoreView, StoreActions) { };

export { VisibilityFilters };
