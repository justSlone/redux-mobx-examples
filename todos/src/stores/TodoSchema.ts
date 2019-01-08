export interface TodoItem {
    id: number;
    text: string;
    completed?: boolean;
}

export interface TodoState {
    todos: TodoItem[],
    nextTodoId: number
}

export const initialTodoState: TodoState = {
    todos: [{
        id: 0,
        text: "Default Todo",
        completed: false
    }],
    nextTodoId: 1
}