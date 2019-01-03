import TodoList from "../components/TodoList";
import { StoreView, StoreActions, Store } from "../stores";
import { connect } from "../stores/StoreHelper";

const mapViewToProps = (view: StoreView, ownProps: any)  => ({
  todos: view.visibleTodos
});

const mapActionsToProps = (actions: StoreActions, ownProps: any)  => ({
  toggleTodo: (id: number) => actions.toggleTodo(id),
  removeTodo: (id: number) => actions.removeTodo(id)
});

export default connect(mapViewToProps, mapActionsToProps)(TodoList);
