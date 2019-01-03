import { action, decorate, extendObservable, observable, computed, IObservableValue} from "mobx";
import {View, Actions, CreateStore} from './StoreHelper';

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

class FilterStoreState{
  @observable
  visibilityFilter: string = VisibilityFilters.SHOW_ALL
}

class FilterStoreView extends View<FilterStoreState>{  
  @computed
  get visibilityFilter() {
    return this.state.visibilityFilter;
  }
}

class FilterStoreActions extends Actions<FilterStoreState> {  
  @action
  setVisibilityFilter = (filter: string) => {    
    this.state.visibilityFilter = filter;
  }
}

let FilterStore = CreateStore(FilterStoreState, FilterStoreView, FilterStoreActions);
export {FilterStore};