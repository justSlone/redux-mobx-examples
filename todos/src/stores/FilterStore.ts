import { action, decorate, extendObservable, observable, computed, IObservableValue} from "mobx";

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

export class FilterStore {    
  @observable
  private state = observable.box(VisibilityFilters.SHOW_ALL);
  
  /* State */
  @computed
  get visibilityFilter() {
    return this.state.get();
  }

  /* Actions */
  @action
  setVisibilityFilter = (filter: string) => {
    this.state.set(filter);
  }
}