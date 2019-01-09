
import {
  createStore,
  action,
  mutator,
  orchestrator,
  mutatorAction,
  getRootStore
} from "satcheljs";
import { TodoState } from './TodoSchema';
import { computed } from 'mobx';

const initialState: TodoState = {
  todos: [{
      id: 0,
      text: "Default Todo",
      completed: false
  }],
  nextTodoId: 1
}


const createActions = (store: ()=>TodoState) => {
  let actions = {
    addTodo: action(
      'ADD_TODO',
      (text: string) => ({ text: text })
    ),
  
    removeTodo: mutatorAction("REMOVE_TODO", function removeTodo (id: number) {
      store().todos = store().todos.filter(todo => todo.id !== id);
    }),
    
    toggleTodo: mutatorAction("TOGGLE_TODO", function toggleTodo(id: number) {
      store().todos.forEach(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
      });
    })
  }  

  mutator(actions.addTodo, (actionMessage) => {
    const _store = store();
    _store.todos.push({
      id: _store.nextTodoId++,
      text: actionMessage.text, 
      completed: false
    });
  });

  return actions;
}

const createSelectors = (store: () => TodoState) => {
  return {
    completedTodosCount: computed(() => {
      return store().todos.filter(todo => todo.completed).length;
    }),
  }
}

export const TodoStore = { initialState, createActions, createSelectors};

//export class TodoStore extends CreateSatchelStore(initialTodoState, TodoActions) {}

// export class TodoStore {
//   private _store: () => TodoState
//   public actions: any
//   constructor(name: string, initialState: TodoState = initialTodoState) {
//     this._store = createStore<TodoState>(name, initialState); 
//     this.actions = new TodoActions(this._store);
//   }

//   store = () => {
//     return this._store() as DeepReadonly<TodoState>;
//   }
// }

// let createTodoStore = (name: string, initialState: TodoState = initialTodoState) => {
//   let localStore = createStore<TodoState>(name, initialState);   

//   let todoActions = new TodoActions(localStore);

//   return {
//     store: localStore as () => DeepReadonly<TodoState>,
//     actions: todoActions
//   }
// }

// export {createTodoStore}

// export class TodoStore extends CreateStore(
//   TodoStoreState,
//   TodoStoreView,
//   TodoStoreActions
// ) {}
