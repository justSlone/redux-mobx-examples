import Link from "../components/Link";
import { connect } from '../stores/StoreHelper';
import { Selectors, Actions } from '../stores'

const mapSelectorsToProps = (selectors: any, ownProps: any) => ({
  active: ownProps.filter === selectors.getVisibilityFilter()
});

const mapActionsToProps = (actions: Actions, ownProps: any) => ({
  onClick: () => actions.setVisibilityFilter(ownProps.filter)
});

export default connect(mapSelectorsToProps, mapActionsToProps)(Link);
