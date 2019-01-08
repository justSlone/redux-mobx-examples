
import {
  createStore,
  action,
  mutator,
  orchestrator,
  mutatorAction
} from "satcheljs";
import {TodoItem, TodoState, initialTodoState } from './TodoSchema';
import {DeepReadonly}from "ts-essentials";

let createTodoStore = (name: string, initialState: TodoState = initialTodoState) => {
  let localStore = createStore<TodoState>(name, initialState);   

  let todoActions = {
    addTodo: mutatorAction("ADD_TODO", function addTodo(text: string) {
      const store = localStore();
      store.todos.push({
        id: store.nextTodoId++,
        text, 
        completed: false
      });
    }),
  
    removeTodo: mutatorAction("REMOVE_TODO", function removeTodo(id: number) {
      localStore().todos = localStore().todos.filter(todo => todo.id !== id);
    }),
    
    toggleTodo: mutatorAction("TOGGLE_TODO", function toggleTodo(id: number) {
      localStore().todos.forEach(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
      });
    })
  }

  return {
    store: localStore as () => DeepReadonly<TodoState>,
    actions: todoActions
  }
}

export {createTodoStore}

// export class TodoStore extends CreateStore(
//   TodoStoreState,
//   TodoStoreView,
//   TodoStoreActions
// ) {}
