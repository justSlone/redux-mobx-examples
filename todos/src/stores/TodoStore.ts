import { computed, observable, IObservableArray } from "mobx";
import { CreateStore, View, Actions } from "./StoreHelper";
import {
  createStore,
  action,
  mutator,
  orchestrator,
  mutatorAction
} from "satcheljs";

export interface TodoItem {
  id: number;
  text: string;
  completed?: boolean;
}

let todoStore = createStore("todoStore", { todos: [] as TodoItem[] });  


let todoActions = {
  addTodo: mutatorAction("ADD_TODO", function addTodo({id, text}: TodoItem) {
    todoStore().todos.push({
      id,
      text, 
      completed: false
    });
  }),

  removeTodo: mutatorAction("REMOVE_TODO", function removeTodo(id: number) {
    todoStore().todos = todoStore().todos.filter(todo => todo.id !== id);
  }),
  
  toggleTodo: mutatorAction("TOGGLE_TODO", function toggleTodo(id: number) {
    todoStore().todos.forEach(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });
  })
}

export {todoStore, todoActions}

// export class TodoStore extends CreateStore(
//   TodoStoreState,
//   TodoStoreView,
//   TodoStoreActions
// ) {}
