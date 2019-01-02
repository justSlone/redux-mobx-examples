import { computed, action, observable, ObservableMap } from "mobx";
import { createObservableArray, IObservableArray, observe } from "mobx/lib/internal";

export interface TodoItem {
  id: number;
  text: string;
  completed?: boolean;
}

class TodoStoreState{
  @observable
  todos: IObservableArray<TodoItem> = observable([]);
}

export class TodoStore {    
  private state = new TodoStoreState();
  
  /* State */    
  get todos() {
    return this.state.todos;
  }
  
  @computed
  get completedTodosCount() {    
    return this.state.todos.filter(todo => todo.completed).length;
  }

  /* Actions */
  @action
  addTodo = ({ id, text }: TodoItem) => { //TODO: this binding is ugly
    this.state.todos.push({
      id,
      text,
      completed: false
    });
  };

  @action
  removeTodo = (id: number) => {
    this.state.todos.replace(this.state.todos.filter(todo => todo.id !== id));
  };

  @action
  toggleTodo = (id: number) => {
    this.state.todos.forEach(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
  };
}