import {todoStore, todoActions} from "./TodoStore";
import {toJS} from 'mobx';

let view = todoStore();
let actions = todoActions;


describe("todo store", () => {
  it("should handle initial todoStore", () => {
    expect(toJS(view.todos)).toEqual([]);
  });
  
  it("should handle ADD_TODO", () => {
    actions.addTodo({
      text: "Run the tests",
      id: 0
    });
    expect(toJS(view.todos)).toEqual([
      {
        text: "Run the tests",
        completed: false,
        id: 0
      }
    ]);

    actions.addTodo({
      text: "Use Mobx",
      id: 1
    });
    expect(toJS(view.todos)).toEqual([
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

    actions.addTodo({
      text: "Fix the tests",
      id: 2
    });

    expect(toJS(view.todos)).toEqual([
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
    actions.toggleTodo(1);

    expect(toJS(view.todos)).toEqual([
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
  //   expect(toJS(view.completedTodosCount)).toEqual(1);
  // });


  it("should handle REMOVE_TODO", () => {
    actions.removeTodo(1);

    expect(toJS(view.todos)).toEqual([
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
