import TodoList from "../components/TodoList";
import { connect } from "../stores/StoreHelper";
import { StoreSelectors, StoreActions } from '../stores'

const mapSelectorsToProps = (selectors: StoreSelectors, ownProps: any)  => ({
  todos: selectors.getVisibleTodos()
});

const mapActionsToProps = (actions: StoreActions, ownProps: any)  => ({
  toggleTodo: actions.toggleTodo,
  removeTodo: actions.removeTodo
});

export default connect(mapSelectorsToProps, mapActionsToProps)(TodoList);
