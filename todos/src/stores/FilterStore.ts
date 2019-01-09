import { action, observable, computed } from "mobx";
import {createStore, mutatorAction} from 'satcheljs';
import {DeepReadonly}from "ts-essentials";
import {VisibilityFilters, FilterState, initialFilterState} from './FilterSchema';

export let createFilterStore = (name: string, initialState: FilterState = initialFilterState) => {
  let localStore = createStore<FilterState>(name, initialState);   

  let actions = {
    setVisibilityFilter: mutatorAction("SET_VISIBILITY", function setVisibilityFilter(filter: VisibilityFilters) {
      localStore().visibilityFilter = filter;
    })
  }

  return {
    store: localStore as () => DeepReadonly<FilterState>,
    actions: actions
  }
}

export const createFilterActions = (store: () => FilterState) => {
  return {
    setVisibilityFilter: mutatorAction("SET_VISIBILITY", function setVisibilityFilter(filter: VisibilityFilters) {
      store().visibilityFilter = filter;
    })
  }
  
}

export const createFilterSelectors = (store: () => FilterState) => {
  return {
    getVisibilityFilter: () => {
      return store().visibilityFilter;
    }
  }
}