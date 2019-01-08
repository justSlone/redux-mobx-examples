import { computed, action, observable, IObservableArray} from "mobx";
import { CreateStore, View, Actions } from "./StoreHelper";

export interface TodoItem {
  id: number;
  text: string;
  completed?: boolean;
}

export class TodoStoreState {
  @observable
  todos: IObservableArray<TodoItem> = observable([]);
}

export class TodoStoreActions  {  
  constructor(protected state: TodoStoreState) {}
  @action
  addTodo({ id, text }: TodoItem) {
    //TODO: this binding is ugly
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

export class TodoStore extends CreateStore(TodoStoreState, TodoStoreActions) {};
