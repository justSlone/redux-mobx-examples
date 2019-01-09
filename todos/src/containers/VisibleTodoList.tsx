import TodoList from "../components/TodoList";
import { connect } from "../stores/StoreHelper";
import { StoreSelectors, StoreActions } from '../stores'

const mapSelectorsToProps = (selectors: StoreSelectors, ownProps: any)  => ({
  todos: selectors.getVisibleTodos()
});

const mapActionsToProps = (actions: StoreActions, ownProps: any)  => ({
  toggleTodo: (id: number) => actions.toggleTodo(id),
  removeTodo: (id: number) => actions.removeTodo(id)
});

export default connect(mapSelectorsToProps, mapActionsToProps)(TodoList);
