import TodoList from "../components/TodoList";
import { connect } from "../stores/StoreHelper";
import { Selectors, Actions } from '../stores'

const mapSelectorsToProps = (selectors: Selectors, ownProps: any)  => ({
  todos: selectors.visibleTodos
});

const mapActionsToProps = (actions: Actions, ownProps: any)  => ({
  toggleTodo: (id: number) => actions.toggleTodo(id),
  removeTodo: (id: number) => actions.removeTodo(id)
});

export default connect(mapSelectorsToProps, mapActionsToProps)(TodoList);
