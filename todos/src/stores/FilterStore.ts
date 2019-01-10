import {mutatorAction, mutator, orchestrator, action} from 'satcheljs';
import {VisibilityFilters, FilterState } from './FilterSchema';

const initialFilterState: FilterState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL
}

const createActions = (store: () => FilterState) => {
  return {
    setVisibilityFilter: action(
      'SET_VISIBILITY',
      (filter: VisibilityFilters) => ({ filter })
    ),
  }
}

const createFilterSelectors = (store: () => FilterState) => {
  return {
    getVisibilityFilter: () => {
      return store().visibilityFilter;
    }
  }
}

const registerMutators = (store: () => FilterState, actions: ReturnType<typeof createActions>) => {
  mutator(actions.setVisibilityFilter, (actionMessage) => {
    store().visibilityFilter = actionMessage.filter;
  });
}

const registerOrchestrators = (actions: ReturnType<typeof createActions>) => {

}

export const FilterStore = {initialState: initialFilterState, createActions, createSelectors: createFilterSelectors, registerMutators, registerOrchestrators };


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