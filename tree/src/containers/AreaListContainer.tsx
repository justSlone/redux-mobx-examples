import {TreeState, makeEmptyArea} from '../stores/TreeStoreSchema';
import AreaList, {AreaListProps} from '../components/AreaList';
import {TreeStore} from '../stores/TreeStoreClass';
import {connect} from '../stores/StoreHelper';
// import { store } from '../stores/TreeStore';
// import{ collapseArea } from './actions/TreeActions'


const mapSelectorsToProps = (getState: ()=> TreeState, selectors: TreeStore["selectors"], ownProps: any) => {
    return {
      areas: selectors.getAreas(ownProps.areaIds),
      // debugElement: <React.Fragment> Areas: {getState().areas.size} Stories: {getState().stories.size} Measures: {getState().measures.size}</React.Fragment>,
    }
  }
  
  const mapActionsToProps = (actions: TreeStore["actions"], ownProps: AreaListProps) => {
    return {
      collapseArea: actions.collapseArea,
      addStory: actions.addStory, 
      removeArea: actions.removeArea,
      addArea: ()=>actions.addArea(makeEmptyArea()),
    }
  }
  
  export default connect(mapSelectorsToProps,mapActionsToProps)(AreaList);