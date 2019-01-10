import {createStoreFromTemplate, MixObj} from './StoreHelper';
import {TreeStoreTemplate} from './TreeStore';
import {toJS} from 'mobx';
import * as faker from 'faker';

// export const StoreTemplate = {
//     initialState: MixObj(TreeStoreTemplate.initialState),
//     createActions: ()=>{},
//     createSelectors: ()=>{},
//     registerMutators: ()=>{},
//     registerOrchestrators: ()=>{}
//   } 
  
  export const {store, connect} = createStoreFromTemplate("mystore", TreeStoreTemplate)
