import {TreeState, makeEmptyArea} from '../stores/TreeStoreSchema';
import AreaList, {AreaListProps} from '../components/AreaList';
import {TreeStore} from '../stores/TreeStoreClass';
import {connect} from '../stores/StoreHelper';
import StoryList, {StoryListProps} from '../components/StoryList';
// import { store } from '../stores/TreeStore';
// import{ collapseArea } from './actions/TreeActions'


const mapSelectorsToProps = (getState: ()=> TreeState, selectors: TreeStore["selectors"], ownProps: any): Partial<StoryListProps> => {
    return {
      stories: selectors.getStories(ownProps.storyIds)
      // debugElement: <React.Fragment> Areas: {getState().areas.size} Stories: {getState().stories.size} Measures: {getState().measures.size}</React.Fragment>,
    }
  }
  
  const mapActionsToProps = (actions: TreeStore["actions"], ownProps: any): Partial<StoryListProps>=> {
    return {
      collapseStory: actions.collapseStory,
      addMeasure: actions.addMeasure, 
      removeStory: actions.removeStory,
    }
  }
  
  export default connect(mapSelectorsToProps,mapActionsToProps)(StoryList);