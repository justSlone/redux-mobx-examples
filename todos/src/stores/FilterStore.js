import { action, decorate, extendObservable } from "mobx";

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};

export class FilterStore {
  constructor() {    
    extendObservable(this, { _state: VisibilityFilters.SHOW_ALL });
  }

  get state() {
    let _this = this;
    return {
    get visibilityFilter() {
        return _this._state;
      },
    };
  }

  get actions() {
    return decorate(
      {
        setVisibilityFilter: filter => {
          this._state = filter;
        }
      },
      { setVisibilityFilter: action }
    );
  }
}
// decorate(FilterStore, {
//   _state: observable
// });
