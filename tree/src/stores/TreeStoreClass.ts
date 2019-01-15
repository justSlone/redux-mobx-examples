import {
  TreeState,
  initialState as TreeStateInitialState,
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


export class TreeStore {

  public getState: ()=>TreeState
  constructor(name: string, initialState: TreeState = TreeStateInitialState){
    this.getState = createStore(name, initialState);
    this.registerMutators();
    this.registerOrchestrators();
  }

  actions = {
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
  }

  private getByIds<T>(ids: number[], mapOfItems: Map<number, T>): T[] {
    return chain(ids)
      .map(id => mapOfItems.get(id))
      .filter(negate(isNil))
      .value() as T[];
  };
  private getSingleSafe<T>(id: number, mapOfItems: Map<number, T>): T {
    if (!mapOfItems.has(id)) {
      throw new Error(`No item with id = ${id}`);
    } else {
      return mapOfItems.get(id)!;
    }
  };

  selectors = {
    getAreas: (ids: number[]) => this.getByIds(ids, this.getState().areas),
    getStories:(ids: number[]) => this.getByIds(ids, this.getState().stories), 
    getMeasures: (ids: number[]) => this.getByIds(ids, this.getState().measures),
    getAllAreas: () => Array.from(this.getState().areas.values()),
    getArea: (id: number) => this.getSingleSafe(id, this.getState().areas),
    getStory: (id: number) => this.getSingleSafe(id, this.getState().stories),
    getMeasure: (id: number) => this.getSingleSafe(id, this.getState().measures),
    isCollapsed: (id: number, node: Collapseable): boolean => node.collapsed.get(id) || false
  };

  private pushIfNotExists<T>(arr: T[], item: T) {
    if(arr.indexOf(item) === -1){ arr.push(item)};
  }
  
  private initCollapsed(parentId: number, child: Collapseable) {
    child.collapsed.set(parentId, false);
  }

  private addNode(
    mapOfItems: Map<number, GraphNode>,
    parent: GraphNode,
    child: GraphNode
  ) {
    //Make sure we persist the parent/child ids if we are updating an existing item.
    if(mapOfItems.has(child.id)) {
      let node = mapOfItems.get(child.id)!;             
      child.childIds = node.childIds;
      child.parentIds = node.parentIds;
    }   
    // initCollapsed(parent.id, child);
    this.pushIfNotExists(child.parentIds, parent.id);
    mapOfItems.set(child.id, child);
    this.pushIfNotExists(parent.childIds, child.id);      
  };

  removeNode(    
    parent: GraphNode,
    child: GraphNode
  ) {
    let cIdx = findIndex(parent.childIds, id => id === child.id);
    if (!isNil(cIdx)) {
      parent.childIds.splice(cIdx, 1);
    }
  
    let pIdx = findIndex(child.parentIds, id => id === parent.id);
    if (!isNil(pIdx)) {
      child.parentIds.splice(pIdx, 1);
    }
  
  };

  private registerMutators () {
  
    mutator(this.actions.addArea, ({ area }) => {
      const state = this.getState();
      this.initCollapsed(ROOT_ID, area);    
      this.addNode(state.areas, state.root, area);    
    });
  
    mutator(this.actions.addStory, ({ areaId, story }) => {
      let area = this.selectors.getArea(areaId);
      this.initCollapsed(areaId, story);
      this.addNode(this.getState().stories, area, story);    
    });
  
    mutator(this.actions.addMeasure, ({ storyId, measure }) => {
      let story = this.selectors.getStory(storyId);
      this.addNode(this.getState().measures, story, measure);
    });
  
    mutator(this.actions._removeAreaFromParent, ({ areaId }) => {    
      let area = this.selectors.getArea(areaId);
      this.removeNode(this.getState().root, area);
    });
  
    mutator(this.actions._deleteArea, ({ areaId }) => {    
      this.getState().areas.delete(areaId);    
    });
  
    mutator(this.actions._removeStoryFromParent, ({ areaId, storyId }) => {    
      this.removeNode(this.selectors.getArea(areaId), this.selectors.getStory(storyId));
    });
    
    mutator(this.actions._deleteStory, ({ storyId }) => {    
      this.getState().stories.delete(storyId);    
    });
  
    mutator(this.actions._removeMeasureFromParent, ({ storyId, measureId }) => {    
      this.removeNode(this.selectors.getStory(storyId), this.selectors.getMeasure(measureId));
    });
  
    mutator(this.actions._deleteMeasure, ({ measureId }) => {    
      this.getState().measures.delete(measureId);    
    });
  
    mutator(this.actions.collapseArea, ({ areaId }) => {
      let area = this.selectors.getArea(areaId);
      area.collapsed.set(ROOT_ID, !area.collapsed.get(ROOT_ID));
    });
  
    mutator(this.actions.collapseStory, ({ areaId, storyId }) => {
      let story = this.selectors.getStory(storyId);
      story.collapsed.set(areaId, !story.collapsed.get(areaId));    
    });
  };

  private checkAndDeleteChildren (node: GraphNode, removeChildAction: (pId: number, cId: number)=>void, deleteAction: (id: number) => void ) {
    // If this is the last reference for a area we need to do a full delete        
    if (node.parentIds.length === 0) {
      each(node.childIds.slice(), (id)=>{        
        removeChildAction(node.id, id)
      });
      deleteAction(node.id);
    }      
  }

  private registerOrchestrators () {
  
    orchestrator(this.actions.removeArea, ({ areaId }) => {            
      this.actions._removeAreaFromParent(areaId);
      this.checkAndDeleteChildren(this.selectors.getArea(areaId), this.actions.removeStory, this.actions._deleteArea );
    });
  
    orchestrator(this.actions.removeStory, ({ areaId, storyId }) => {    
      this.actions._removeStoryFromParent(areaId, storyId);        
      this.checkAndDeleteChildren(this.selectors.getStory(storyId), this.actions.removeMeasure, this.actions._deleteStory );
    });
  
    orchestrator(this.actions.removeMeasure, ({ storyId, measureId }) => {
      this.actions._removeMeasureFromParent(storyId, measureId)
      this.checkAndDeleteChildren(this.selectors.getMeasure(measureId), ()=>{}, this.actions._deleteMeasure );
    });
  };
}