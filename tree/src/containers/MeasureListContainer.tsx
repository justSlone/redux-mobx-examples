import {TreeState} from '../stores/TreeStoreSchema';
import {TreeStore} from '../stores/TreeStoreClass';
import {connect} from '../stores/StoreHelper';
import MeasureList, {MeasureListProps} from '../components/MeasureList';
// import { store } from '../stores/TreeStore';
// import{ collapseArea } from './actions/TreeActions'


const mapSelectorsToProps = (getState: ()=> TreeState, selectors: TreeStore["selectors"], ownProps: any): Partial<MeasureListProps> => {
    return {
      measures: selectors.getMeasures(ownProps.measureIds),      
      // debugElement: <React.Fragment> Areas: {getState().areas.size} Stories: {getState().stories.size} Measures: {getState().measures.size}</React.Fragment>,
    }
  }
  
  const mapActionsToProps = (actions: TreeStore["actions"], ownProps: any): Partial<MeasureListProps>=> {
    return {
      removeMeasure: actions.removeMeasure,
    }
  }
  
  export default connect(mapSelectorsToProps,mapActionsToProps)(MeasureList);