import { TodoStore, createTodoActions, createTodoSelectors} from "./TodoStore";
import { createFilterStore, createFilterActions, createFilterSelectors } from "./FilterStore";
import { VisibilityFilters, FilterState, initialFilterState } from './FilterSchema';
import { TodoState, initialTodoState} from './TodoSchema';
import { computed } from "mobx";
import { createStore, mutatorAction} from "satcheljs";


// let foo = {...initialFilterState, ...initialTodoState};

// let composedStore = createStore("store", foo);
// let fActions = createFilterActions(composedStore);
// let tActions = createTodoActions(composedStore);
// let composedActions = {...fActions, ...tActions};



// export function CreateSatchelStore<S, A>(
//   initialState: S,
//   Actions: Constructor<A>
// ) {
//   class StoreClass {
//     private _store: () => S
//     public actions: A
//     constructor(name: string, state: S = initialState, force: boolean = false) {
//       if(!force && !!getRootStore().get(name)){
//         throw Error(`Store named '${name}' already exists. use force parameter to force re-creation of store`);
//       }
//       this._store = createStore<S>(name, state); 
//       this.actions = new Actions(this._store);
//     }
  
//     store = () => {
//       return this._store() as DeepReadonly<S>;
//     }
//   }
//   return StoreClass;
// }
type Constructor<T> = new(...args: any[]) => T;

// function MixStore<C1>(ctor1: Constructor<C1>): Constructor<C1>;
// function MixStore<C1, C2>(ctor1: Constructor<C1>, ctor2: Constructor<C2>): Constructor<C1 & C2>;
// function MixStore<C1, C2, C3>(ctor1: Constructor<C1>, ctor2: Constructor<C2>, ctor3: Constructor<C3>): Constructor<C1 & C2 & C3>;
// function MixStore<C1, C2, C3, C4>(ctor1: Constructor<C1>, ctor2: Constructor<C2>, ctor3: Constructor<C3>, ctor4: Constructor<C4>): Constructor<C1 & C2 & C3 & C4>;
// function MixStore<C1, C2, C3, C4, C5>(ctor1: Constructor<C1>, ctor2: Constructor<C2>, ctor3: Constructor<C3>, ctor4: Constructor<C4>, ctor5: Constructor<C5>): Constructor<C1 & C2 & C3 & C4 & C5>;
// function MixStore<C1, C2, C3, C4, C5, C6>(ctor1: Constructor<C1>, ctor2: Constructor<C2>, ctor3: Constructor<C3>, ctor4: Constructor<C4>, ctor5: Constructor<C5>, ctor6: Constructor<C6>): Constructor<C1 & C2 & C3 & C4 & C5 & C6>;
// function MixStore<C1, C2, C3, C4, C5, C6, C7>(ctor1: Constructor<C1>, ctor2: Constructor<C2>, ctor3: Constructor<C3>, ctor4: Constructor<C4>, ctor5: Constructor<C5>, ctor6: Constructor<C6>, ctor7: Constructor<C7>): Constructor<C1 & C2 & C3 & C4 & C5 & C6 & C7>;
// function MixStore<C1, C2, C3, C4, C5, C6, C7, C8>(ctor1: Constructor<C1>, ctor2: Constructor<C2>, ctor3: Constructor<C3>, ctor4: Constructor<C4>, ctor5: Constructor<C5>, ctor6: Constructor<C6>, ctor7: Constructor<C7>, ctor8: Constructor<C8>): Constructor<C1 & C2 & C3 & C4 & C5 & C6 & C7 & C8>;
// function MixStore<C1, C2, C3, C4, C5, C6, C7, C8, C9>(ctor1: Constructor<C1>, ctor2: Constructor<C2>, ctor3: Constructor<C3>, ctor4: Constructor<C4>, ctor5: Constructor<C5>, ctor6: Constructor<C6>, ctor7: Constructor<C7>, ctor8: Constructor<C8>, ctor9: Constructor<C9>): Constructor<C1 & C2 & C3 & C4 & C5 & C6 & C7 & C8 & C9>;
// function MixStore<C1, C2, C3, C4, C5, C6, C7, C8, C9, C10>(ctor1: Constructor<C1>, ctor2: Constructor<C2>, ctor3: Constructor<C3>, ctor4: Constructor<C4>, ctor5: Constructor<C5>, ctor6: Constructor<C6>, ctor7: Constructor<C7>, ctor8: Constructor<C8>, ctor9: Constructor<C9>, ctor10: Constructor<C10>): Constructor<C1 & C2 & C3 & C4 & C5 & C6 & C7 & C8 & C9 & C10>;

interface MixableStore<S> {
  initialState: S,
  createActions: (store: ()=>any)=> any,
  createSelectors: (store: ()=>any)=>any
}

// function MixStore<S1, S2>(s1: MixableStore<S1>, s2: MixableStore<S2>) {
//   class MixedClass {
//     constructor(public store: () => S1&S2){}
//     static initialState = {...s1.initialState as unknown as object, ...s2.initialState as unknown as object} as S1&S2
//     public actions = {...s1.createActions(this.store), ...s2.createActions(this.store)}
//     public selectors = {...s1.createSelectors(this.store), ...s2.createSelectors(this.store)}
//   }
//   return MixedClass
// }

function MixStore<S1, S2>(s1: MixableStore<S1>, s2: MixableStore<S2>) {
  return {
    initialState: {...s1.initialState as unknown as object, ...s2.initialState as unknown as object} as S1&S2,
    createActions: (store: ()=>S1|S2) =>{
      return {
        ...s1.createActions(store),
        ...s2.createActions(store)
      }
    },
    createSelectors: (store: ()=>S1|S2) =>{
      return {
        ...s1.createSelectors(store),
        ...s2.createSelectors(store)
      }
    },
  } as MixableStore<S1&S2>
}

let filter: MixableStore<FilterState> = {
  initialState: initialFilterState,
  createActions: createFilterActions,
  createSelectors: createFilterSelectors
}

let todo: MixableStore<TodoState> = {
  initialState: initialTodoState,
  createActions: createTodoActions,
  createSelectors: createTodoSelectors
}

let createNewSelectors = (store: () => TodoState&FilterState) => {
  return {
    getVisibleTodos: () => {
      switch (store().visibilityFilter) {
        case VisibilityFilters.SHOW_ALL:
          return store().todos;
        case VisibilityFilters.SHOW_COMPLETED:
          return store().todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
          return store().todos.filter(t => !t.completed);
        default:
          throw new Error("Unknown filter: " + store().visibilityFilter);
      }
    },
  }
}

let newStore: MixableStore<{}> = {
  initialState: {},
  createActions: (store)=> ({}),
  createSelectors: createNewSelectors
}

function realizeMixedStore<S1>(s1: MixableStore<S1>) {
  class MixedClass {
    private store = createStore<S1>("store", s1.initialState);
    static initialState = {...s1.initialState as unknown as object} as S1
    public actions = {...s1.createActions(this.store)}
    public selectors = {...s1.createSelectors(this.store)}
  }
  return MixedClass
}

let mixed = MixStore(MixStore(filter, todo), newStore);

export class MixedNew extends realizeMixedStore(mixed) {};

let foo = new MixedNew();
let actions = foo.actions;

// class Mixed extends MixStore(filter, todo) {};
// let foo = createStore("store", Mixed.initialState);

// console.log(new Mixed(foo));


// export function CreateCompositeStore<S, A>(
//   initialState: S,
//   Actions: Constructor<A>
// ) {
//   class StoreNew {
//     private initialState = {...initialFilterState, ...initialTodoState};
//     public store = createStore("store", this.initialState);
//     public actions = {...createFilterActions(this.store), ...createTodoActions(this.store)}
//     public selectors = {
//       getVisibleTodos: () => {
//         const store = this.store();
//         switch (this.store().visibilityFilter) {
//           case VisibilityFilters.SHOW_ALL:
//             return store.todos;
//           case VisibilityFilters.SHOW_COMPLETED:
//             return store.todos.filter(t => t.completed);
//           case VisibilityFilters.SHOW_ACTIVE:
//             return store.todos.filter(t => !t.completed);
//           default:
//             throw new Error("Unknown filter: " + this.store().visibilityFilter);
//         }
//       },
//       ...createTodoSelectors(this.store),
//       ...createFilterSelectors(this.store)
//     }
//   }
//   return StoreNew;
// }




export class StoreNew {
  private initialState = {...initialFilterState, ...initialTodoState};
  public store = createStore("store", this.initialState);
  public actions = {...createFilterActions(this.store), ...createTodoActions(this.store)}
  public selectors = {
    getVisibleTodos: () => {
      const store = this.store();
      switch (this.store().visibilityFilter) {
        case VisibilityFilters.SHOW_ALL:
          return store.todos;
        case VisibilityFilters.SHOW_COMPLETED:
          return store.todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
          return store.todos.filter(t => !t.completed);
        default:
          throw new Error("Unknown filter: " + this.store().visibilityFilter);
      }
    },
    ...createTodoSelectors(this.store),
    ...createFilterSelectors(this.store)
  }
}


export class Store {
  private todoStore = new TodoStore("todoStore")
  private filterStore: ReturnType<typeof createFilterStore>
  public selectors: Selectors
  constructor(){
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