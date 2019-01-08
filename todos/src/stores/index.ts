import { createTodoStore } from "./TodoStore";
import { createFilterStore } from "./FilterStore";
import { VisibilityFilters } from './FilterSchema';
import { computed } from "mobx";

export class Store {
  private todoStore: ReturnType<typeof createTodoStore>
  private filterStore: ReturnType<typeof createFilterStore>
  public selectors: Selectors
  constructor(){
    this.todoStore = createTodoStore("todoStore");
    this.filterStore = createFilterStore("filterStore");
    this.selectors = new Selectors(this.getStores());
  }

  public getStores = () => {
    return {
      todoStore: this.todoStore.store,
      filterStore: this.filterStore.store
    }
  }

  get actions () {
    return {
      ...this.todoStore.actions,
      ...this.filterStore.actions
    }
  }

}

export type Actions = Store["actions"]
export type Stores = ReturnType<Store["getStores"]>

export class Selectors {
  constructor(private stores: ReturnType<Store["getStores"]>){ }

  @computed
  get completedTodosCount() {
    const stores = this.stores;
    return stores.todoStore().todos.filter(todo => todo.completed).length;
  }

  get visibilityFilter() {
    return this.stores.filterStore().visibilityFilter;
  }

  get visibleTodos() {
    const store = this.stores.todoStore();
    switch (this.stores.filterStore().visibilityFilter) {
      case VisibilityFilters.SHOW_ALL:
        return store.todos;
      case VisibilityFilters.SHOW_COMPLETED:
        return store.todos.filter(t => t.completed);
      case VisibilityFilters.SHOW_ACTIVE:
        return store.todos.filter(t => !t.completed);
      default:
        throw new Error("Unknown filter: " + this.stores.filterStore().visibilityFilter);
    }
  }
}

// export class Store extends CreateStore(StoreState, StoreView, StoreActions) { };

// export class StoreState {
// }

// let { store: todoStore, actions: todoActions } = createTodoStore("todoStore");

// let { store: filterStore, actions: filterActions } = createFilterStore("filterStore");

// export let store = () => {
//   return {
//     ...todoStore(),
//     ...filterStore()
//   }
// }

// export let actions = {
//   ...todoActions,
//   ...filterActions
// }

// export let selectors = {
  
//   completedTodosCount: computed(() => {
//     const store = todoStore();
//     return store.todos.filter(todo => todo.completed).length;
//   }),
//   visibleTodos: () => {
//     let localStore = store();
//     switch (filterStore().visibilityFilter) {
//       case VisibilityFilters.SHOW_ALL:
//         return localStore.todos;
//       case VisibilityFilters.SHOW_COMPLETED:
//         return localStore.todos.filter(t => t.completed);
//       case VisibilityFilters.SHOW_ACTIVE:
//         return localStore.todos.filter(t => !t.completed);
//       default:
//         throw new Error("Unknown filter: " + localStore.visibilityFilter);
//     }
//   }
// }

// export class StoreView {
//   /* State */
//   get visibilityFilter() {
//     return filterStore().visibilityFilter;
//   }

//   get todos() {
//     return todoStore().todos;
//   }

//   /* Computed */
//   @computed
//   get completedTodosCount() {
//     const store = todoStore();
//     return store.todos.filter(todo => todo.completed).length;
//   }


//   /* Utility */
//   get visibleTodos() {
//     switch (filterStore().visibilityFilter) {
//       case VisibilityFilters.SHOW_ALL:
//         return this.todos;
//       case VisibilityFilters.SHOW_COMPLETED:
//         return this.todos.filter(t => t.completed);
//       case VisibilityFilters.SHOW_ACTIVE:
//         return this.todos.filter(t => !t.completed);
//       default:
//         throw new Error("Unknown filter: " + this.visibilityFilter);
//     }
//   }
// }