
import {
  createStore,
  action,
  mutator,
  orchestrator,
  mutatorAction,
  getRootStore
} from "satcheljs";
import { TodoState, TodoItem } from './TodoSchema';
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
    addTodoEnd: action(
      'ADD_TODO_END',
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
  
  return actions;
}

const createSelectors = (store: () => TodoState) => {
  return {
    completedTodosCount: computed(() => {
      return store().todos.filter(todo => todo.completed).length;
    }),
  }
}

const registerMutators = (store: () => TodoState, actions: ReturnType<typeof createActions>) => {

  let _addTodo = (actionMessage: {text: string}) => {
    const _store = store();
    _store.todos.push({
      id: _store.nextTodoId++,
      text: actionMessage.text, 
      completed: false
    });
  }
  mutator(actions.addTodo, _addTodo);
  mutator(actions.addTodoEnd, _addTodo);
}

function doSomething(text: string) {
  // We are pretending to make a call. Usually this is where you would put "fetch" calls
  return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 800);
  });
}

const registerOrchestrators = (actions: ReturnType<typeof createActions>) => {
  orchestrator(actions.addTodo, async (actionMessage) => {
    await doSomething(actionMessage.text);
    actions.addTodoEnd(actionMessage.text + " CallBack");
  });
}

export const TodoStore = { initialState, createActions, createSelectors, registerMutators, registerOrchestrators};

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
