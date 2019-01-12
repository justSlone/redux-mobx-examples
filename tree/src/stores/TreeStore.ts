import { TreeState, initialState, Collapseable, Story, Area, Measure, GraphNode } from "./TreeStoreSchema";
import {
  createStore,
  action,
  mutator,
  orchestrator,
  mutatorAction,
  getRootStore
} from "satcheljs";
import { computed } from "mobx";
import { map, filter, chain, isNil, negate, isEmpty } from 'lodash';

const createActions = (store: () => TreeState) => {

  return {
    addArea: action("ADD_AREA", (area: Area) => ({ area })),
    addStory: action("ADD_STORY", (areaId: number, story: Story) => ({ areaId, story })),
    addMeasure: action("ADD_MEASURE", (storyId: number, measure: Measure) => ({ storyId, measure })),
    collapseArea: action("COLLAPSE_AREA", (areaId: number) => ({areaId})),
    collapseStory: action("COLLAPSE_STORY", (storyId: number) => ({storyId})),
    removeMeasure: action("REMOVE_MEASURE", (storyId: number, measureId: number) => ({storyId, measureId})),
    //   removeMeasure: action("REMOVE_MEASURE", (storyId: number, measureId: number) => ({ storyId, measureId})),
    //   removeMeasureFromStory: action("REMOVE_MEASURE_FROM_STORY", (story: Story, measureId: number) => ({ story, measureId}))    
  };
};

// const getStory = (store: ()=> TreeState, storyId: number) => {
//   return store().stories.get(storyId);
// }

const createSelectors = (store: () => TreeState) => {
  let getByIds = function <T>(ids: number[], mapOfItems: Map<number, T>): T[] {
    return (
      chain(ids)
        .map((id) => mapOfItems.get(id))
        .filter(negate(isNil))
        .value()
    ) as T[];
  }
  let getSingleSafe = function <T>(id: number, mapOfItems: Map<number, T>): T {
    let item = mapOfItems.get(id);
    if(isNil(item)){
      throw new Error(`No item with id = ${id}`);
    }
    return item;
  }
  let getAreas = (ids: number[]) => getByIds(ids, store().areas);
  let getStories = (ids: number[]) => getByIds(ids, store().stories);
  let getMeasures = (ids: number[]) => getByIds(ids, store().measures);
  let getArea = (id: number) => getSingleSafe(id, store().areas);
  let getStory = (id: number) => getSingleSafe(id, store().stories);
  let getMeasure = (id: number) => getSingleSafe(id, store().measures);
  let getAllAreas = () => Array.from(store().areas.values())
  let selectors = {
    getAreas,
    getStories,
    getMeasures,
    getAllAreas, 
    getArea, 
    getStory, 
    getMeasure
  };
  return selectors;
};

const registerMutators = (
  getState: () => TreeState,
  actions: ReturnType<typeof createActions>,
  selectors: ReturnType<typeof createSelectors>
) => {

  let addNode= (mapOfItems: Map<number, GraphNode>, parent: GraphNode, child: GraphNode ) =>{
    child.parentIds.push(parent.id);
    mapOfItems.set(child.id, child);
    parent.childIds.push(child.id);
    
  }

  let removeNode= (mapOfItems: Map<number, GraphNode>, parent: GraphNode, child: GraphNode ) =>{
    parent.childIds = filter(parent.childIds, (id)=>id!==child.id);
    child.parentIds = filter(child.parentIds, (id)=>id!==parent.id);
    if(child.parentIds.length === 0){
      mapOfItems.delete(child.id)
    }
  }

  mutator(actions.addArea, ({ area }) => {
    const state = getState();
    addNode(state.areas, state, area);
  })

  mutator(actions.addStory, ({ areaId, story }) => {
    let area = selectors.getArea(areaId);
    addNode(getState().stories, area, story);
  })
  
  mutator(actions.addMeasure, ({ storyId, measure }) => {
    let story = selectors.getStory(storyId);
    addNode(getState().measures, story, measure);
  })

  mutator(actions.removeMeasure, ({ storyId, measureId }) => {
    let story = selectors.getStory(storyId);
    let measure = selectors.getMeasure(measureId);
    removeNode(getState().measures, story, measure);
  })

  mutator(actions.collapseArea, ({areaId})=>{
    let area = selectors.getArea(areaId);
    area.collapsed = !area.collapsed
  })

  mutator(actions.collapseStory, ({storyId})=>{
    let story = selectors.getStory(storyId);
    story.collapsed = !story.collapsed
  })
  
  //   let selectors = createSelectors(store);  

  //   mutator(actions.collapseStory, actionMessage => {
  //     let story = selectors.getStoryById(actionMessage.storyId);
  //     if (story === null) {
  //       return;
  //     }
  //     story.collapsed = !story.collapsed;
  //   });

  //   //BAD!?
  // //   mutator(actions.collapseNode, actionMessage => {
  // //     let node = actionMessage.node;
  // //     node.collapsed = !node.collapsed;
  // //   });

  //   // Better?
  //   mutator(actions.collapseNode, actionMessage => {
  //     let node = selectors.getCollapseableNode(actionMessage.node);
  //     if (node === null) {
  //       return;
  //     }
  //     node.collapsed = !node.collapsed;
  //   });

  //   mutator(actions.addMeasure, actionMessage => {
  //     let story = actionMessage.story;
  //     story.measures.push(makeMeasure());
  //   });

  //   mutator(actions.removeMeasure, actionMessage => {
  //     let {storyId, measureId} = actionMessage;
  //     let story = selectors.getStoryById(storyId);
  //     if(story === null) {return;}    
  //     story.measures = story.measures.filter((m)=>(m.id !== measureId));        
  //   });

  //   mutator(actions.removeMeasureFromStory, actionMessage => {
  //     let {story, measureId} = actionMessage;
  //     story.measures = story.measures.filter((m)=>(m.id !== measureId));        
  //   });

};

const registerOrchestrators = (actions: ReturnType<typeof createActions>) => { };

export const TreeStoreTemplate = {
  initialState,
  createActions,
  createSelectors,
  registerMutators,
  registerOrchestrators
};
