import {createStoreFromTemplate, MixObj} from './StoreHelper';
import {TreeStoreTemplate} from './TreeStore';
import {toJS} from 'mobx';
import * as faker from 'faker';
import {makeEmptyArea, makeEmptyStory, makeEmptyMeasure} from './TreeStoreSchema';

// export const StoreTemplate = {
//     initialState: MixObj(TreeStoreTemplate.initialState),
//     createActions: ()=>{},
//     createSelectors: ()=>{},
//     registerMutators: ()=>{},
//     registerOrchestrators: ()=>{}
//   } 
  
  export const {store, connect} = createStoreFromTemplate("mystore", TreeStoreTemplate)
  let area = makeEmptyArea();
  let story = makeEmptyStory();
  let measure = makeEmptyMeasure();
  store.actions.addArea(area);
  store.actions.addStory(area.id, story);
  store.actions.addMeasure(story.id, measure);
