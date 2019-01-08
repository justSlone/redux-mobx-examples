import { TodoStore, TodoItem, TodoStoreState, TodoStoreActions} from "./TodoStore";
import { FilterStore, VisibilityFilters, FilterStoreState, FilterStoreActions } from "./FilterStore";
import { CreateStore, View, Actions, CreateStoreFactory, CompositeState } from './StoreHelper';
import { computed } from 'mobx';
import Todo from "../components/Todo";
import {Mixin, MixinDecorator} from './mixins';

// export class StoreState {
//   todoStore = new TodoStore()
//   filterStore = new FilterStore()
// }

export class StoreState extends Mixin(TodoStoreState, FilterStoreState) {
}

export class StoreView extends View<StoreState> {

  // // This is optional to reduce typing
  // private filterState = this.state.filterStore.getState();
  // private todoState = this.state.todoStore.getState();

  /* State */
  get visibilityFilter() {
    return this.state.visibilityFilter;
  }

  get todos() {
    return this.state.todos;
  }

  /* Computed */
  @computed
  get completedTodosCount() {
    return this.state.todos.filter((todo:any) => todo.completed).length;
  }

  /* Utility */
  get visibleTodos() {
    let state = this.state;
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

export class StoreActions extends Mixin(TodoStoreActions, FilterStoreActions) {
  /* Actions */
  private _nextTodoId = 0;
  addTodoText(text: string) {
    console.log(this.addTodo);
    return this.addTodo({
      id: this._nextTodoId++,
      text
    });
  }
  //toggleTodo = this.state.todoStore.actions.toggleTodo;
  //removeTodo = this.state.todoStore.actions.removeTodo;
  //setVisibilityFilter = this.state.filterStore.actions.setVisibilityFilter;
}

export class Store extends CreateStore(StoreState, StoreActions) { };

export { VisibilityFilters };
