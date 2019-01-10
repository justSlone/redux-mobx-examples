import { TodoStore } from "./TodoStore";
import { FilterStore} from "./FilterStore";
import { VisibilityFilters, FilterState } from './FilterSchema';
import { TodoState } from './TodoSchema';
import {MixObj, MixFun, realizeMixedStore, createStoreFromTemplate, createConnectFromTemplate, getTypesFromTemplate, MixFun2} from './StoreHelper';

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

export const MixedStoreTemplate = {
  initialState: MixObj(FilterStore.initialState, TodoStore.initialState),
  createActions: MixFun(FilterStore.createActions, TodoStore.createActions),
  createSelectors: MixFun(FilterStore.createSelectors, TodoStore.createSelectors, createNewSelectors),
  registerMutators: MixFun2(FilterStore.registerMutators, TodoStore.registerMutators),
  registerOrchestrators: MixFun2(FilterStore.registerOrchestrators, TodoStore.registerOrchestrators)
} 

export const {store, connect} = createStoreFromTemplate("mystore", MixedStoreTemplate)
export type StoreState = ReturnType<typeof store.getState>;
export type StoreActions = typeof store.actions;
export type StoreSelectors = typeof store.selectors;

export class MixedStore extends realizeMixedStore(MixedStoreTemplate){}
