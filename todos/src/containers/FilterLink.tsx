import Link from "../components/Link";
import { connect } from '../stores/StoreHelper';
import { StoreActions, StoreSelectors} from '../stores';

const mapSelectorsToProps = (selectors: StoreSelectors, ownProps: any) => ({
  active: ownProps.filter === selectors.getVisibilityFilter()
});

const mapActionsToProps = (actions: StoreActions, ownProps: any) => ({
  onClick: () => actions.setVisibilityFilter(ownProps.filter)
});

export default connect(mapSelectorsToProps, mapActionsToProps)(Link);
