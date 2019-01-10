import { TreeState, initialState, Collapseable, Story, Area, Measure, makeMeasure} from "./TreeStoreSchema";
import {
  createStore,
  action,
  mutator,
  orchestrator,
  mutatorAction,
  getRootStore
} from "satcheljs";
import { computed } from "mobx";

const createActions = (store: () => TreeState) => {
  return {
    doThing: action("DO_THING", (theThing: string) => ({ theThing })),
    collapseStory: action("COLLAPSE_STORY", (storyId: number) => ({ storyId })),
    collapseNode: action("COLLAPSE_NODE", (node: Collapseable) => ({ node })),
    addMeasure: action("ADD_MEASURE", (story: Story) => ({ story })),
    removeMeasure: action("REMOVE_MEASURE", (storyId: number, measureId: number) => ({ storyId, measureId})),
    removeMeasureFromStory: action("REMOVE_MEASURE_FROM_STORY", (story: Story, measureId: number) => ({ story, measureId}))    
  };
};

const createSelectors = (store: () => TreeState) => {
  return {
    getAreas: () => store().areas,
    getMeasureCount: (story: Story) => {
        return story.measures.length;
    },    
    getStoryById: (id: number) => {
      const state = store();
      for (const area of state.areas) {
        for (const story of area.stories) {
          if (story.id === id) {
            return story;
          }
        }
      }
      return null;
    },
    getCollapseableNode: (node: Collapseable) =>{
        const state = store();
      for (const area of state.areas) {
        if(area == node) { return area }
        for (const story of area.stories) {
          if (story === node) {return story }
          for (const measure of story.measures) {
            //Fails due to types
            //if (measure === node) {return measure }
          }
        }
      }
      return null;
    }
  };
};

const registerMutators = (
  store: () => TreeState,
  actions: ReturnType<typeof createActions>
) => {
  let selectors = createSelectors(store);  

  mutator(actions.collapseStory, actionMessage => {
    let story = selectors.getStoryById(actionMessage.storyId);
    if (story === null) {
      return;
    }
    story.collapsed = !story.collapsed;
  });

  //BAD!?
//   mutator(actions.collapseNode, actionMessage => {
//     let node = actionMessage.node;
//     node.collapsed = !node.collapsed;
//   });

  // Better?
  mutator(actions.collapseNode, actionMessage => {
    let node = selectors.getCollapseableNode(actionMessage.node);
    if (node === null) {
      return;
    }
    node.collapsed = !node.collapsed;
  });

  mutator(actions.addMeasure, actionMessage => {
    let story = actionMessage.story;
    story.measures.push(makeMeasure());
  });

  mutator(actions.removeMeasure, actionMessage => {
    let {storyId, measureId} = actionMessage;
    let story = selectors.getStoryById(storyId);
    if(story === null) {return;}    
    story.measures = story.measures.filter((m)=>(m.id !== measureId));        
  });

  mutator(actions.removeMeasureFromStory, actionMessage => {
    let {story, measureId} = actionMessage;
    story.measures = story.measures.filter((m)=>(m.id !== measureId));        
  });

};

const registerOrchestrators = (actions: ReturnType<typeof createActions>) => {};

export const TreeStoreTemplate = {
  initialState,
  createActions,
  createSelectors,
  registerMutators,
  registerOrchestrators
};
