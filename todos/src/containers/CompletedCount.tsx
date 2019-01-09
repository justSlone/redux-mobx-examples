import Count from "../components/Count";
import { StoreActions, StoreSelectors} from '../stores';
import {connect} from '../stores/StoreHelper';

const mapSelectorsToProps = (selectors: StoreSelectors) => ({
  count: selectors.completedTodosCount.get()
});

//TODO make this an optional parameter
const mapActionsToProps = (actions: StoreActions) => ({
});

export default connect(mapSelectorsToProps, mapActionsToProps)(Count);
