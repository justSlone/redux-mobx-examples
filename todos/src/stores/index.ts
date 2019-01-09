import { TodoStore } from "./TodoStore";
import { FilterStore} from "./FilterStore";
import { VisibilityFilters, FilterState } from './FilterSchema';
import { TodoState } from './TodoSchema';
import {MixObj, MixFun, realizeMixedStore} from './StoreHelper';

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
  createSelectors: MixFun(FilterStore.createSelectors, TodoStore.createSelectors, createNewSelectors)
} 

export class MixedStore extends realizeMixedStore(MixedStoreTemplate){}
export type StoreState = ReturnType<typeof MixedStore.prototype.getState>;
export type StoreActions = typeof MixedStore.prototype.actions;
export type StoreSelectors = typeof MixedStore.prototype.selectors;