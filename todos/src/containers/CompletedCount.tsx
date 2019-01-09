import Count from "../components/Count";
import { Selectors, Actions } from '../stores'
import {connect} from '../stores/StoreHelper';

const mapSelectorsToProps = (selectors: any) => ({
  count: selectors.completedTodosCount.get()
});

//TODO make this an optional parameter
const mapActionsToProps = (actions: Actions) => ({
});

export default connect(mapSelectorsToProps, mapActionsToProps)(Count);
