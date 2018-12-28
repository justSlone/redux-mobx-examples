import { computed, action, decorate, extendObservable} from "mobx";

export class TodoStore {
  constructor() {    
    extendObservable(this, { _state: [] });
  }  

  get state() {
    let _this = this;
    return decorate({
      get todos() {
        return _this._state;
      },
      get completedTodosCount() {
        return _this._state.filter(todo => todo.completed).length;
      }
    },
    {            
      completedTodosCount: computed
    });
  }

  get actions() {
    return decorate(
      {
        addTodo: ({ id, text }) =>
          this._state.push({
            id,
            text,
            completed: false
          }),
        removeTodo: id =>
          (this._state = this._state.filter(todo => todo.id !== id)),
        toggleTodo: id =>
          this._state.forEach(todo => {
            if (todo.id === id) {
              todo.completed = !todo.completed;
            }
          })
      },
      { addTodo: action, removeTodo: action, toggleTodo: action }
    );
  }
}
// decorate(TodoStore, {
//   _state: observable,
// });
