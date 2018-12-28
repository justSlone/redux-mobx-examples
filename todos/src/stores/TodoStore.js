import { observable, computed, action, decorate } from "mobx";

export class TodoStore {
  constructor() {
    this._state = [];
  }
  _state;

  get completedTodosCount() {
    return this._state.filter(todo => todo.completed).length;
  }

  getState = ()=> {
    return this._state;
  }

  addTodo = ({ id, text }) => {
    this._state.push({
      id,
      text,
      completed: false
    });
  };

  removeTodo = id => (
    this._state = this._state.filter(todo => todo.id !== id)
  )

  toggleTodo = id => (
    this._state.forEach(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    })
  )
}
decorate(TodoStore, {
  _state: observable,
  completedTodosCount: computed,
  addTodo: action,
  toggleTodo: action,
  removeTodo: action,  
});
