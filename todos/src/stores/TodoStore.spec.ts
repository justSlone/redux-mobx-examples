import {TodoStore} from "./TodoStore";
import {realizeMixedStore} from './StoreHelper';
import {toJS} from 'mobx';
import { TodoState } from "./TodoSchema";

let initialState: TodoState = {
  todos: [],
  nextTodoId: 0
}

// let {store: todoStore, actions: todoActions} = createTodoStore("todoStore",initialState);

class TodoStoreClass extends realizeMixedStore(TodoStore) {}
let todoStoreClass = new TodoStoreClass("todoStore", initialState);
var todoStore = todoStoreClass.getState;
let todoActions = todoStoreClass.actions;

describe("todo store", () => {
  it("should handle initial todoStore", () => {
    expect(toJS(todoStore().todos)).toEqual([]);
  });
  
  it("should handle ADD_TODO", () => {
    todoActions.addTodo("Run the tests");
    expect(toJS(todoStore().todos)).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: 0
      }
    ]);

    todoActions.addTodo("Use Mobx");
    expect(toJS(todoStore().todos)).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: 0
      },
      {
        text: "Use Mobx",
        completed: false,
        id: 1
      }
    ]);

    todoActions.addTodo("Fix the tests");

    expect(toJS(todoStore().todos)).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: 0
      },
      {
        text: "Use Mobx",        
        completed: false,
        id: 1
      },
      {
        text: "Fix the tests",
        completed: false,
        id: 2
      }
    ]);
  });

  it("should handle TOGGLE_TODO", () => {
    todoActions.toggleTodo(1);

    expect(toJS(todoStore().todos)).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: 0
      },
      {
        text: "Use Mobx",
        completed: true,
        id: 1
      },
      {
        text: "Fix the tests",
        completed: false,
        id: 2
      }
    ]);
  });

  // it("should handle completedTodosCount", () => {
  //   expect(toJS(todoStore().completedTodosCount)).toEqual(1);
  // });


  it("should handle REMOVE_TODO", () => {
    todoActions.removeTodo(1);

    expect(toJS(todoStore().todos)).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: 0
      },
      {
        text: "Fix the tests",
        completed: false,
        id: 2
      }
    ]);
  });
});
