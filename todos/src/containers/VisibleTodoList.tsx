import TodoList from "../components/TodoList";
import { connect } from "../stores/StoreHelper";
import { Selectors, Actions } from '../stores'

const mapSelectorsToProps = (selectors: any, ownProps: any)  => ({
  todos: selectors.getVisibleTodos()
});

const mapActionsToProps = (actions: Actions, ownProps: any)  => ({
  toggleTodo: (id: number) => actions.toggleTodo(id),
  removeTodo: (id: number) => actions.removeTodo(id)
});

export default connect(mapSelectorsToProps, mapActionsToProps)(TodoList);
