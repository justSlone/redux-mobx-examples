import { TodoStore } from "./TodoStore";
import { FilterStore, VisibilityFilters } from "./FilterStore";
import { observable, computed, action, decorate } from "mobx";

const todoStore = new TodoStore();
const filterStore = new FilterStore();

let nextTodoId = 0;

export class Store { 

  state = {    
    get visibilityFilter() {
      return filterStore._state
    },
    get todos() {
      return todoStore._state
    },
    get completedTodosCount() {
      return todoStore.completedTodosCount 
    }  
  }

  actions = {
    addTodo: text =>
      todoStore.addTodo({
        id: nextTodoId++,
        text
      }),
    toggleTodo: todoStore.toggleTodo,
    removeTodo: todoStore.removeTodo,
    setVisibilityFilter: filterStore.setVisibilityFilter
  }
};

export { VisibilityFilters }