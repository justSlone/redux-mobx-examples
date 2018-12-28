import { TodoStore } from "./TodoStore";
import { FilterStore, VisibilityFilters } from "./FilterStore";

export class Store {
  constructor(){
    this._todoStore = new TodoStore();
    this._filterStore = new FilterStore();    
  }
  _todoStore
  _filterStore
  
  //TODO: build this based on a protoype object
  get state() {
    let _this = this;
    return {
      get visibilityFilter() {
        return _this._filterStore.state.visibilityFilter;
      },
      get todos() {
        return _this._todoStore.state.todos;
      },
      get completedTodosCount() {
        return _this._todoStore.state.completedTodosCount;
      }
    };       
  }

  _nextTodoId = 0;
  get actions() {    
    return {
      addTodo: text =>
      this._todoStore.actions.addTodo({
          id: this._nextTodoId++,
          text
        }),
      toggleTodo: this._todoStore.actions.toggleTodo,
      removeTodo: this._todoStore.actions.removeTodo,
      setVisibilityFilter: this._filterStore.actions.setVisibilityFilter
    }
  };
}

export { VisibilityFilters };
