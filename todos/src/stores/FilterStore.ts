import { action, decorate, extendObservable, observable, computed, IObservableValue} from "mobx";

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};


class FilterStoreState{
  @observable
  visibilityFilter: string = VisibilityFilters.SHOW_ALL
}

export class FilterStore {  
  state = new FilterStoreState();
  
  /* State */  
  @computed
  get visibilityFilter() {
    return this.state.visibilityFilter;
  }

  /* Actions */
  @action
  setVisibilityFilter = (filter: string) => {    
    this.state.visibilityFilter = filter;
  }
}