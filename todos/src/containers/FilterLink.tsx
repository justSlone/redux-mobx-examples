import Link from "../components/Link";
import { StoreActions, StoreSelectors, connect} from '../stores';
import {VisibilityFilters} from '../stores/FilterSchema';

export interface FilterLinkProps {
  filter: VisibilityFilters
}

const mapSelectorsToProps = (selectors: StoreSelectors, ownProps: FilterLinkProps) => ({
  active: ownProps.filter === selectors.getVisibilityFilter()
});

const mapActionsToProps = (actions: StoreActions, ownProps: FilterLinkProps) => ({
  onClick: () => actions.setVisibilityFilter(ownProps.filter)
});

export default connect(mapSelectorsToProps, mapActionsToProps)(Link);
