import {FilterStore} from "./FilterStore";
import {realizeMixedStore, createStoreFromTemplate} from './StoreHelper';
import {toJS} from 'mobx';
import { FilterState, VisibilityFilters} from "./FilterSchema";

const initialFilterState: FilterState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL
}

// class TodoStoreClass extends realizeMixedStore(FilterStore) {}
// let storeClass = new TodoStoreClass("filterStore", initialFilterState);
// var store = storeClass.getState;
// let actions = storeClass.actions;
// let selectors = storeClass.selectors;

let {store: {getState: store, actions, selectors}} = createStoreFromTemplate("name", FilterStore)

describe("todo store", () => {
  it("should handle initial filterState", () => {
    expect(toJS(store())).toEqual({visibilityFilter: VisibilityFilters.SHOW_ALL});
  });
  
  it("should handle SET_VISIBILITY", () => {
    actions.setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED);
    expect(toJS(store().visibilityFilter)).toEqual(VisibilityFilters.SHOW_COMPLETED);
  });

  it("Selector should work", () => {
    actions.setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED);
    expect(selectors.getVisibilityFilter()).toEqual(VisibilityFilters.SHOW_COMPLETED);
    actions.setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE);
    expect(selectors.getVisibilityFilter()).toEqual(VisibilityFilters.SHOW_ACTIVE);
  });
});
