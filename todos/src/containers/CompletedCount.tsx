import Count from "../components/Count";
import { StoreView, StoreActions } from '../stores'
import {connect} from '../stores/StoreHelper';

const mapViewToProps = (view: StoreView) => ({
  count: view.completedTodosCount
});

//TODO make this an optional parameter
const mapActionsToProps = (actions: StoreActions) => ({  
});

export default connect(mapViewToProps, mapActionsToProps)(Count);
