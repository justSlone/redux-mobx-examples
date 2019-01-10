import {MixedStore, MixedStoreTemplate} from "./";
import { VisibilityFilters} from "./FilterSchema";
import { createStoreFromTemplate } from "./StoreHelper";

let initalState = MixedStoreTemplate.initialState;
let {store: {getState: store, actions, selectors}} = createStoreFromTemplate("testStore", MixedStoreTemplate);

describe("todo store", () => {
  it("should handle initial filterState", () => {
    expect(store())
      .toEqual(initalState);
  });
  
  it("should handle SET_VISIBILITY", () => {
    actions.setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED);
    expect(store().visibilityFilter)
      .toEqual(VisibilityFilters.SHOW_COMPLETED);
  });

  it("Selector should work", () => {
    actions.setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED);
    expect(selectors.getVisibilityFilter())
      .toEqual(VisibilityFilters.SHOW_COMPLETED);
    actions.setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE);
    expect(selectors.getVisibilityFilter())
      .toEqual(VisibilityFilters.SHOW_ACTIVE);
  });

  it("should handle GetVisibleTodos", () => {
    actions.setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED);
    actions.toggleTodo(0);    
    expect(selectors.getVisibleTodos()).toEqual([{
      text: "Default Todo",
      id: 0,
      completed: true
    }]);
    actions.addTodo("Another Todo");
    expect(selectors.getVisibleTodos().length).toEqual(1);
    actions.setVisibilityFilter(VisibilityFilters.SHOW_ALL);
    expect(selectors.getVisibleTodos().length).toEqual(2);
  });

});
