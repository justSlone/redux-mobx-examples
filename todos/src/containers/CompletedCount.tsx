import Count from "../components/Count";
import { Store, Selectors, Actions } from '../stores'
import {connect} from '../stores/StoreHelper';

const mapSelectorsToProps = (selectors: Selectors) => ({
  count: selectors.completedTodosCount
});

//TODO make this an optional parameter
const mapActionsToProps = (actions: Actions) => ({
});

export default connect(mapSelectorsToProps, mapActionsToProps)(Count);
