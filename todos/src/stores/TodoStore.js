import { observable, computed, action, decorate} from 'mobx'

// export class Todo {
//     constructor({ id, text, completed }) {
//         this.id = id;
//         this.text = text;
//         this.completed = completed;
//     }
// }

export const addTodoCreator = (state) => {
    let nextTodoId = 0
    return (text) => {
        state.addTodo({
            id: nextTodoId++,
            text,            
            completed: false
        });
    }
};

export class TodoStore {    
    state = observable([]);

    get completedTodosCount() {
        return this.todos.filter(todo => todo.completed).length
    }    

    /*private*/ nextTodoId = 0;      
    // not a pure function
    addTodoImpure(text) {
        this.state.push({
            id:  this.nextTodoId++,
            text,            
            completed: false
        });
    }


    addTodo({id, text, completed = false}) {
        this.state.push({
            id,
            text,            
            completed
        });
    }

    toggleTodo(id){        
        this.state.forEach((todo)=>{
            if(todo.id === id){
                todo.completed = !todo.completed;
            }
        });        
    }
}
decorate(TodoStore, {
    todos: observable,    
    completedTodosCount: computed,
    addTodo: action,
    toggleTodo: action
  });
