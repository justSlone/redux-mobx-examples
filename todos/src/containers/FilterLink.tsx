import Link from "../components/Link";
import { StoreView, StoreActions } from "../stores";
import { connect } from '../stores/StoreHelper';

const mapViewToProps = (view: StoreView, ownProps: any) => ({
  active: ownProps.filter === view.visibilityFilter
});

const mapActionsToProps = (actions: StoreActions, ownProps: any) => ({
  onClick: () => actions.setVisibilityFilter(ownProps.filter)
});

export default connect(mapViewToProps, mapActionsToProps)(Link);
