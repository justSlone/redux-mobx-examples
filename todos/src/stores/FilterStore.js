import { observable, action, decorate, computed } from 'mobx'

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
  }
  
export class FilterStore { 
    constructor() {
        this._state = VisibilityFilters.SHOW_ALL;
    }   
    _state

    getState = () => {
        return this._state;
    }

    setVisibilityFilter = (filter) => {
        this._state = filter;        
    }
}
decorate(FilterStore, {
    _state: observable,        
    setVisibilityFilter: action,    
  });
