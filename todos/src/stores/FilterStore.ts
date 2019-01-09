import {mutatorAction} from 'satcheljs';
import {VisibilityFilters, FilterState } from './FilterSchema';

const initialFilterState: FilterState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL
}

const createFilterActions = (store: () => FilterState) => {
  return {
    setVisibilityFilter: mutatorAction("SET_VISIBILITY", function setVisibilityFilter(filter: VisibilityFilters) {
      store().visibilityFilter = filter;
    })
  }
}

const createFilterSelectors = (store: () => FilterState) => {
  return {
    getVisibilityFilter: () => {
      return store().visibilityFilter;
    }
  }
}

export const FilterStore = {initialState: initialFilterState, createActions: createFilterActions, createSelectors: createFilterSelectors };


// export let createFilterStore = (name: string, initialState: FilterState = initialFilterState) => {
//   let localStore = createStore<FilterState>(name, initialState);   

//   let actions = {
//     setVisibilityFilter: mutatorAction("SET_VISIBILITY", function setVisibilityFilter(filter: VisibilityFilters) {
//       localStore().visibilityFilter = filter;
//     })
//   }

//   return {
//     store: localStore as () => DeepReadonly<FilterState>,
//     actions: actions
//   }
// }