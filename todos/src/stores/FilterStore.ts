import { action, observable, computed } from "mobx";
import {View, Actions, CreateStore} from './StoreHelper';

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

export class FilterStoreState {
  @observable
  visibilityFilter: string = VisibilityFilters.SHOW_ALL
}

export class FilterStoreActions extends Actions<FilterStoreState> {  
  @action
  setVisibilityFilter = (filter: string) => {    
    this.state.visibilityFilter = filter;
  }
}

export class FilterStore extends CreateStore(FilterStoreState, FilterStoreActions) {};