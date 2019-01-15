import {
  TreeState,
  initialState,
  Collapseable,
  Story,
  Area,
  Measure,
  GraphNode,
  ROOT_ID
} from "./TreeStoreSchema";
import {
  createStore,
  action,
  mutator,
  orchestrator,
  mutatorAction,
  getRootStore
} from "satcheljs";
import { computed, toJS } from "mobx";
import {
  map,
  filter,
  chain,
  isNil,
  negate,
  isEmpty,
  findIndex,
  each
} from "lodash";
import { array } from "prop-types";

const createActions = (store: () => TreeState) => {
  return {
    addArea: action("ADD_AREA", (area: Area) => ({ area })),
    addStory: action("ADD_STORY", (areaId: number, story: Story) => ({
      areaId,
      story
    })),
    addMeasure: action("ADD_MEASURE", (storyId: number, measure: Measure) => ({
      storyId,
      measure
    })),
    collapseArea: action("COLLAPSE_AREA", (areaId: number) => ({ areaId })),
    collapseStory: action("COLLAPSE_STORY", (areaId: number, storyId: number) => ({ areaId, storyId })),
    removeArea: action("REMOVE_AREA", (areaId: number) => ({ areaId })),
    _removeAreaFromParent: action("REMOVE_AREA_NODE", (areaId: number) => ({ areaId })),    
    _deleteArea: action("DELETE_AREA", (areaId: number) => ({ areaId })),
    removeStory: action("REMOVE_STORY", (areaId: number, storyId: number) => ({areaId,storyId})),
    _removeStoryFromParent: action("REMOVE_STORY_NODE", (areaId: number, storyId: number) => ({areaId, storyId})),
    _deleteStory: action("DELETE_STORY", (storyId: number) => ({ storyId })),
    removeMeasure: action("REMOVE_MEASURE",(storyId: number, measureId: number) => ({ storyId, measureId })),
    _removeMeasureFromParent: action("REMOVE_MEASURE_NODE",(storyId: number, measureId: number) => ({ storyId, measureId })),
    _deleteMeasure: action("DELETE_MEASURE", (measureId: number) => ({ measureId })),

    //   removeMeasure: action("REMOVE_MEASURE", (storyId: number, measureId: number) => ({ storyId, measureId})),
    //   removeMeasureFromStory: action("REMOVE_MEASURE_FROM_STORY", (story: Story, measureId: number) => ({ story, measureId}))
  };
};

// const getStory = (store: ()=> TreeState, storyId: number) => {
//   return store().stories.get(storyId);
// }

const createSelectors = (store: () => TreeState) => {
  let getByIds = function<T>(ids: number[], mapOfItems: Map<number, T>): T[] {
    return chain(ids)
      .map(id => mapOfItems.get(id))
      .filter(negate(isNil))
      .value() as T[];
  };
  let getSingleSafe = function<T>(id: number, mapOfItems: Map<number, T>): T {
    if (!mapOfItems.has(id)) {
      throw new Error(`No item with id = ${id}`);
    } else {
      return mapOfItems.get(id)!;
    }
  };
  let getAreas = (ids: number[]) => getByIds(ids, store().areas);
  let getStories = (ids: number[]) => getByIds(ids, store().stories);
  let getMeasures = (ids: number[]) => getByIds(ids, store().measures);
  let getArea = (id: number) => getSingleSafe(id, store().areas);
  let getStory = (id: number) => getSingleSafe(id, store().stories);
  let getMeasure = (id: number) => getSingleSafe(id, store().measures);
  let getAllAreas = () => Array.from(store().areas.values());
  let isCollapsed = (id: number, node: Collapseable): boolean => node.collapsed.get(id) || false
  let selectors = {
    getAreas,
    getStories,
    getMeasures,
    getAllAreas,
    getArea,
    getStory,
    getMeasure, 
    isCollapsed
  };
  return selectors;
};

let pushIfNotExists = function<T>(arr: T[], item: T) {
  if(arr.indexOf(item) === -1){ arr.push(item)};
}

let initCollapsed = (parentId: number, child: Collapseable) => {
  child.collapsed.set(parentId, false);
}

let addNode1 = (
  mapOfItems: Map<number, GraphNode>,
  parent: GraphNode,
  child: GraphNode
) => {
  //Make sure we persist the parent/child ids if we are updating an existing item.
  if(mapOfItems.has(child.id)) {
    let node = mapOfItems.get(child.id)!;             
    child.childIds = node.childIds;
    child.parentIds = node.parentIds;
  }   
  // initCollapsed(parent.id, child);
  pushIfNotExists(child.parentIds, parent.id);
  mapOfItems.set(child.id, child);
  pushIfNotExists(parent.childIds, child.id);  
  
};

let addNode = (
  mapOfItems: Map<number, GraphNode>,
  parent: GraphNode,
  child: GraphNode
) => {
  //Make sure we persist the parent/child ids if we are updating an existing item.
  if(mapOfItems.has(child.id)) {
    let node = mapOfItems.get(child.id)!;             
    child.childIds = node.childIds;
    child.parentIds = node.parentIds;
  }   
  // initCollapsed(parent.id, child);
  pushIfNotExists(child.parentIds, parent.id);
  mapOfItems.set(child.id, child);
  pushIfNotExists(parent.childIds, child.id);  
  
};

let removeNode = (    
  parent: GraphNode,
  child: GraphNode
) => {
  let cIdx = findIndex(parent.childIds, id => id === child.id);
  if (!isNil(cIdx)) {
    parent.childIds.splice(cIdx, 1);
  }

  let pIdx = findIndex(child.parentIds, id => id === parent.id);
  if (!isNil(pIdx)) {
    child.parentIds.splice(pIdx, 1);
  }

};

const registerMutators = (
  getState: () => TreeState,
  actions: ReturnType<typeof createActions>,
  selectors: ReturnType<typeof createSelectors>
) => {

  mutator(actions.addArea, ({ area }) => {
    const state = getState();
    initCollapsed(ROOT_ID, area);    
    addNode(state.areas, state.root, area);    
  });

  mutator(actions.addStory, ({ areaId, story }) => {
    let area = selectors.getArea(areaId);
    initCollapsed(areaId, story);
    addNode(getState().stories, area, story);    
  });

  mutator(actions.addMeasure, ({ storyId, measure }) => {
    let story = selectors.getStory(storyId);
    addNode(getState().measures, story, measure);
  });

  mutator(actions._removeAreaFromParent, ({ areaId }) => {    
    let area = selectors.getArea(areaId);
    removeNode(getState().root, area);
  });

  mutator(actions._deleteArea, ({ areaId }) => {    
    getState().areas.delete(areaId);    
  });

  mutator(actions._removeStoryFromParent, ({ areaId, storyId }) => {    
    removeNode(selectors.getArea(areaId), selectors.getStory(storyId));
  });
  
  mutator(actions._deleteStory, ({ storyId }) => {    
    getState().stories.delete(storyId);    
  });

  mutator(actions._removeMeasureFromParent, ({ storyId, measureId }) => {    
    removeNode(selectors.getStory(storyId), selectors.getMeasure(measureId));
  });

  mutator(actions._deleteMeasure, ({ measureId }) => {    
    getState().measures.delete(measureId);    
  });

  mutator(actions.collapseArea, ({ areaId }) => {
    let area = selectors.getArea(areaId);
    area.collapsed.set(ROOT_ID, !area.collapsed.get(ROOT_ID));
  });

  mutator(actions.collapseStory, ({ areaId, storyId }) => {
    let story = selectors.getStory(storyId);
    story.collapsed.set(areaId, !story.collapsed.get(areaId));    
  });
};

let checkAndDeleteChildren = (node: GraphNode, removeChildAction: (pId: number, cId: number)=>void, deleteAction: (id: number) => void ) => {
  // If this is the last reference for a area we need to do a full delete        
  if (node.parentIds.length === 0) {
    each(node.childIds.slice(), (id)=>{        
      removeChildAction(node.id, id)
    });
    deleteAction(node.id);
  }      
}

const registerOrchestrators = (
  actions: ReturnType<typeof createActions>,
  selectors: ReturnType<typeof createSelectors>
) => {

  orchestrator(actions.removeArea, ({ areaId }) => {            
    actions._removeAreaFromParent(areaId);
    checkAndDeleteChildren(selectors.getArea(areaId), actions.removeStory, actions._deleteArea );
  });

  orchestrator(actions.removeStory, ({ areaId, storyId }) => {    
    actions._removeStoryFromParent(areaId, storyId);        
    checkAndDeleteChildren(selectors.getStory(storyId), actions.removeMeasure, actions._deleteStory );
  });

  orchestrator(actions.removeMeasure, ({ storyId, measureId }) => {
    actions._removeMeasureFromParent(storyId, measureId)
    checkAndDeleteChildren(selectors.getMeasure(measureId), ()=>{}, actions._deleteMeasure );
  });
};

export const TreeStoreTemplate = {
  initialState,
  createActions,
  createSelectors,
  registerMutators,
  registerOrchestrators
};
