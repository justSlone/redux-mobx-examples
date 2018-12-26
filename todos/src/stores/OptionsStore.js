import { observable, action, decorate} from 'mobx'

// export class Todo {
//     constructor({ id, text, completed }) {
//         this.id = id;
//         this.text = text;
//         this.completed = completed;
//     }
// }
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
  }
  
export class OptionsStore {    
    state = observable({visibilityFilter: VisibilityFilters.SHOW_ALL});

    setVisibilityFilter(filter) {        
        this.state.visibilityFilter = filter;
    }
}
decorate(OptionsStore, {
    state: observable,        
    setVisibilityFilter: action    
  });
