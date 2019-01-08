import Link from "../components/Link";
import { connect } from '../stores/StoreHelper';
import { Selectors, Actions } from '../stores'

const mapSelectorsToProps = (selectors: Selectors, ownProps: any) => ({
  active: ownProps.filter === selectors.visibilityFilter
});

const mapActionsToProps = (actions: Actions, ownProps: any) => ({
  onClick: () => actions.setVisibilityFilter(ownProps.filter)
});

export default connect(mapSelectorsToProps, mapActionsToProps)(Link);
