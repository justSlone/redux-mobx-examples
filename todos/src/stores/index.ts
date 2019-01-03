import { TodoStore, TodoItem } from "./TodoStore";
import { FilterStore, VisibilityFilters } from "./FilterStore";


interface IStore {
  visibilityFilter: string,
  todos: TodoItem[],
  completedTodosCount: number,
  addTodo: (text:string) => void,
  toggleTodo: (id: number) => void,
  removeTodo: (id: number) => void,
  setVisibilityFilter: (filter: string) => void,
  visibleTodos: TodoItem[]
}

class StoreState {
  todoStore = new TodoStore();
  filterStore = new FilterStore();
}

export class Store implements IStore {
  private state = new StoreState();

  /* State */
  get visibilityFilter() {
    return this.state.filterStore.visibilityFilter;
  }

  get todos() {
    return this.state.todoStore.todos;
  }

  /* Computed */
  get completedTodosCount() {
    return this.state.todoStore.completedTodosCount;
  }

  /* Actions */
  private _nextTodoId = 0;
  addTodo(text: string) {
    return this.state.todoStore.addTodo({
      id: this._nextTodoId++,
      text
    });
  }
  toggleTodo = this.state.todoStore.toggleTodo;
  removeTodo = this.state.todoStore.removeTodo;
  setVisibilityFilter = this.state.filterStore.setVisibilityFilter;

  /* Utility */  
  get visibleTodos(): TodoItem[] {
    switch (this.visibilityFilter) {
      case VisibilityFilters.SHOW_ALL:
        return this.todos;
      case VisibilityFilters.SHOW_COMPLETED:
        return this.todos.filter(t => t.completed);
      case VisibilityFilters.SHOW_ACTIVE:
        return this.todos.filter(t => !t.completed);
      default:
        throw new Error("Unknown filter: " + this.visibilityFilter);
    }
  }
}


export { VisibilityFilters };
