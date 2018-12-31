import {
  action,
  decorate,
  extendObservable,
  observable,
  computed,
  IObservableValue
} from "mobx";

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};
type Constructor<T = {}> = new (...args: any[]) => T;

class FilterState {
  @observable
  visibilityFilter: string = VisibilityFilters.SHOW_ALL;
}

export function Filter<TBase extends Constructor>(Base: TBase) {
  let newClass = class extends Base {
    state = new FilterState();

    /* State */

    get visibilityFilter() {
      return this.state.visibilityFilter;
    }

    /* Actions */

    setVisibilityFilter = (filter: string) => {
      this.state.visibilityFilter = filter;
    };
  };

  decorate(newClass, {
    visibilityFilter: computed,
    setVisibilityFilter: action
  });
  return newClass;
}
