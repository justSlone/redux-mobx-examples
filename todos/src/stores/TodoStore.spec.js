import {TodoStore, addTodoCreator} from "./TodoStore";
var todoStore = new TodoStore();
let addTodo = addTodoCreator(todoStore);

describe("todo store", () => {
  it("should handle initial state", () => {
    expect(todoStore.state).toEqual([]);
  });

  it("should handle ADD_TODO", () => {
    todoStore.addTodo({
      text: "Run the tests",
      id: 0
    });
    expect(todoStore.state).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: 0
      }
    ]);

    todoStore.addTodo({
      text: "Use Mobx",
      id: 1
    });
    expect(todoStore.state).toEqual([
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

    todoStore.addTodo({
      text: "Fix the tests",
      id: 2
    });

    expect(todoStore.state).toEqual([
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
    todoStore.toggleTodo(1);

    expect(todoStore.state).toEqual([
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
});
