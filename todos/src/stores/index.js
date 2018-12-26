import {TodoStore} from './TodoStore'
import {OptionsStore} from './OptionsStore';


const todoStore = new TodoStore()
const optionsStore = new OptionsStore();    
export {todoStore};
export {optionsStore};

//export default Store