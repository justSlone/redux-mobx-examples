import { computed, action, observable } from "mobx";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export class TodoStore {  
  @observable
  private state: Array<Todo> = new Array<Todo>();  
  
  /* State */
  get todos() {
    return this.state;
  }

  @computed
  get completedTodosCount() {
    return this.state.filter(todo => todo.completed).length;
  }

  /* Actions */
  @action
  addTodo = ({ id, text }) => {
    this.state.push({
      id,
      text,
      completed: false
    });
  };

  @action
  removeTodo = id => {
    this.state = this.state.filter(todo => todo.id !== id);
  };

  @action
  toggleTodo = id => {
    this.state.forEach(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
  };
}