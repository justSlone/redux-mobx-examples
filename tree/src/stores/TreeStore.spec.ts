import { TreeStoreTemplate } from "./TreeStore";
import {
  TreeState,
  Area,
  Story,
  Measure,
  makeEmptyArea,
  makeEmptyStory,
  makeEmptyMeasure,
  GraphNode,
  ROOT_ID
} from "./TreeStoreSchema";
import { realizeMixedStore, createStoreFromTemplate } from "./StoreHelper";
import { toJS, ObservableMap } from "mobx";
import { action } from "satcheljs";
import { first, get } from "lodash";

const initialState: TreeState = {
  areas: new ObservableMap<number, Area>(),
  stories: new ObservableMap<number, Story>(),
  measures: new ObservableMap<number, Measure>(),
  root: {
    parentIds: [],
    childIds: [],
    id: ROOT_ID
  }
};

// class TodoStoreClass extends realizeMixedStore(FilterStore) {}
// let storeClass = new TodoStoreClass("filterStore", initialFilterState);
// var store = storeClass.getState;
// let actions = storeClass.actions;
// let selectors = storeClass.selectors;
TreeStoreTemplate.initialState = initialState;

let {
  store: { getState, actions, selectors }
} = createStoreFromTemplate("name", TreeStoreTemplate);

describe("todo store", () => {
  let testAreaId = 123;
  let testStoryId = 456;
  let testMeasureId = 789;

  it("should handle empty getAreas 1", () => {
    expect(getState().areas).toEqual(getState().areas);
  });

  it("should handle empty getAreas", () => {
    expect(selectors.getAreas([testAreaId])).toEqual([]);
  });

  it("should handle add area", () => {
    let newArea = makeEmptyArea();
    newArea.id = testAreaId;
    actions.addArea(newArea);
    expect(selectors.getArea(newArea.id)).toEqual(newArea);
  });

  it("should handle add story", () => {
    let newStory = makeEmptyStory();
    newStory.id = testStoryId;
    actions.addStory(testAreaId, newStory);
    expect(selectors.getAreas([testAreaId])[0].childIds).toEqual([testStoryId]);
    expect(selectors.getStories([testStoryId])).toEqual([newStory]);
  });

  it("should handle add story to invalid area", () => {
    let badGroupId = testAreaId + 4;
    let newId = testStoryId + 8;
    let newStory = makeEmptyStory();
    newStory.id = newId;
    let badAdd = () => actions.addStory(badGroupId, newStory);
    expect(badAdd).toThrow(`No item with id = ${badGroupId}`);

    // Confirm no changes
    expect(selectors.getAreas([testAreaId])[0].childIds).toEqual([testStoryId]);
    expect(selectors.getStories([newId])).toEqual([]);
  });

  it("should handle add measure", () => {
    let newMeasure = makeEmptyMeasure();
    newMeasure.id = testMeasureId;
    actions.addMeasure(testStoryId, newMeasure);
    expect(selectors.getStories([testStoryId])[0].childIds).toEqual([
      newMeasure.id
    ]);
    expect(selectors.getMeasures([testMeasureId])).toEqual([newMeasure]);
  });

  it("should handle add measure to invalid story", () => {
    let badStoryId = testStoryId + 6;
    let newMesureId = testMeasureId + 9;
    let newMeasure = makeEmptyMeasure();
    newMeasure.id = newMesureId;
    let badAddMeasure = () => actions.addMeasure(badStoryId, newMeasure);
    expect(badAddMeasure).toThrow(`No item with id = ${badStoryId}`);

    // Confirm no changes
    expect(selectors.getStories([testStoryId])[0].childIds).toEqual([
      testMeasureId
    ]);
    expect(selectors.getMeasures([newMesureId])).toEqual([]);
  });

  let testAddNode = (
    addFunc: (id: number, child: any) => void,
    getParent: (id: number) => GraphNode,
    getChild: (id: number) => GraphNode,
    parentId: number,
    newChild: GraphNode,
    otherChildId: number
  ) => {
    let childId = newChild.id;
    addFunc(parentId, newChild);
    expect(getParent(parentId).childIds).toEqual([otherChildId, childId]);
    expect(getChild(childId).parentIds).toEqual([parentId]);
    expect(getChild(childId)).toEqual(newChild);
  };

  it("should handle remove measure", () => {
    let parentId = testStoryId;
    let otherChildId = testMeasureId;
    let childId = testMeasureId + 67;
    let newChild = makeEmptyMeasure();
    newChild.id = childId;
    let getParent = selectors.getStory;
    let getChild = selectors.getMeasure;

    testAddNode(
      actions.addMeasure,
      getParent,
      getChild,
      parentId,
      newChild,
      otherChildId
    );

    actions.removeMeasure(parentId, childId);
    expect(getParent(parentId).childIds).toEqual([otherChildId]);
    expect(() => getChild(childId).parentIds).toThrow(
      `No item with id = ${childId}`
    );
  });

  it("should handle double add measure", () => {
    let newMeasure = makeEmptyMeasure();
    newMeasure.id = testMeasureId;
    // We already did this once
    actions.addMeasure(testStoryId, newMeasure);
    expect(selectors.getStories([testStoryId])[0].childIds).toEqual([
      newMeasure.id
    ]);
    expect(selectors.getMeasures([testMeasureId])).toEqual([newMeasure]);
  });

  it("should handle remove story", () => {
    let parentId = testAreaId;
    let otherChildId = testStoryId;
    let childId = testStoryId + 47;
    let newChild = makeEmptyStory();
    newChild.id = childId;
    let getParent = selectors.getArea;
    let getChild = selectors.getStory;

    testAddNode(
      actions.addStory,
      getParent,
      getChild,
      parentId,
      newChild,
      otherChildId
    );

    actions.removeStory(parentId, childId);
    expect(getParent(parentId).childIds).toEqual([otherChildId]);
    expect(() => getChild(childId).parentIds).toThrow(
      `No item with id = ${childId}`
    );
  });

  it("should handle remove area", () => {
    //let parentId = testAreaId;
    // let getParent = selectors.getArea;
    let otherChildId = testAreaId;
    let childId = testStoryId + 47;
    let newChild = makeEmptyArea();
    newChild.id = childId;
    let getChild = selectors.getArea;

    expect(newChild).toEqual(newChild);

    actions.addArea(newChild);
    expect(newChild).toEqual(newChild);

    expect(getState().root.childIds).toEqual([otherChildId, childId]);
    expect(getChild(childId).parentIds).toEqual([ROOT_ID]);
    expect(getState().areas.get(childId)).toEqual(newChild);

    actions.removeArea(childId);
    expect(getState().root.childIds).toEqual([otherChildId]);
    expect(() => getChild(childId).parentIds).toThrow(
      `No item with id = ${childId}`
    );
  });

  it("should handle remove area advanced", () => {
    //Construct a fresh store
    const testInitialState: TreeState = {
        areas: new ObservableMap<number, Area>(),
        stories: new ObservableMap<number, Story>(),
        measures: new ObservableMap<number, Measure>(),
        root: {
          parentIds: [],
          childIds: [],
          id: ROOT_ID
        }
      };
    TreeStoreTemplate.initialState = testInitialState;
    let {
      store: { getState, actions, selectors }
    } = createStoreFromTemplate("removeArea", TreeStoreTemplate);
    
    let area1 = makeEmptyArea();
    let area2 = makeEmptyArea();
    let story1 = makeEmptyStory();
    let story2 = makeEmptyStory();
    let measure1 = makeEmptyMeasure();
    let measure2 = makeEmptyMeasure();

    actions.addArea(area1);
    actions.addArea(area2);
    expect(getState().areas.size).toEqual(2);
    expect(getState().root.childIds).toEqual([area1.id, area2.id]);

    actions.addStory(area1.id, story1);
    actions.addMeasure(story1.id, measure1);
    expect(selectors.getArea(area1.id).childIds).toEqual([story1.id]);
    expect(selectors.getStory(story1.id).childIds).toEqual([measure1.id]);

    actions.addStory(area2.id, story1);
    actions.addStory(area2.id, story2);
    actions.addMeasure(story2.id, measure2);

    expect(getState().root.childIds).toEqual([area1.id, area2.id]);
    expect(selectors.getArea(area1.id).childIds).toEqual([story1.id]);
    expect(selectors.getStory(story1.id).childIds).toEqual([measure1.id]);
    expect(selectors.getStory(story1.id).parentIds).toEqual([
      area1.id,
      area2.id
    ]);

    expect(selectors.getArea(area2.id).childIds).toEqual([
      story1.id,
      story2.id
    ]);

    expect(getState().areas.size).toEqual(2);
    expect(getState().stories.size).toEqual(2);
    expect(getState().measures.size).toEqual(2);

    actions.removeArea(area2.id);

    expect(getState().root.childIds).toEqual([area1.id]);
    expect(selectors.getArea(area1.id).childIds).toEqual([story1.id]);
    expect(selectors.getStory(story1.id).childIds).toEqual([measure1.id]);
    expect(selectors.getStory(story1.id).parentIds).toEqual([area1.id]);

    expect(getState().areas.size).toEqual(1);
    expect(getState().stories.size).toEqual(1);
    expect(getState().measures.size).toEqual(1);
  });

  it("should handle remove measure from 1 of 2 stories", () => {
    let parentId = testStoryId + 99;
    let childId = testMeasureId + 88;
    let newParent = makeEmptyStory();
    newParent.id = parentId;
    let newChild = makeEmptyMeasure();
    newChild.id = childId;
    let otherParentId = testStoryId;

    actions.addStory(testAreaId, newParent);
    expect(selectors.getArea(testAreaId).childIds).toContain(parentId);
    expect(selectors.getStory(parentId).parentIds).toEqual([testAreaId]);

    actions.addMeasure(parentId, newChild);
    expect(selectors.getStory(parentId).childIds).toEqual([childId]);
    expect(selectors.getMeasure(childId).parentIds).toEqual([parentId]);
    expect(selectors.getMeasure(childId)).toEqual(newChild);

    // Add the child to another parent
    actions.addMeasure(otherParentId, newChild);
    expect(selectors.getMeasure(childId).parentIds).toEqual([
      parentId,
      otherParentId
    ]);
    expect(selectors.getStory(otherParentId).childIds).toContain(newChild.id);

    // Remove the child
    actions.removeMeasure(parentId, childId);
    expect(selectors.getStory(parentId).childIds).toEqual([]);
    expect(selectors.getMeasure(childId).parentIds).toEqual([otherParentId]);

    // Remove the child from the other parent
    actions.removeMeasure(otherParentId, childId);
    expect(selectors.getStory(otherParentId).childIds).not.toContain(childId);
    expect(() => selectors.getMeasure(childId).parentIds).toThrow(
      `No item with id = ${childId}`
    );
  });

  it("should handle collapse area", () => {
    let before = selectors.getArea(testAreaId).collapsed.get(ROOT_ID);
    actions.collapseArea(testAreaId);
    let after = selectors.getArea(testAreaId).collapsed.get(ROOT_ID);
    expect(after).toEqual(!before);
    actions.collapseArea(testAreaId);
    let after2 = selectors.getArea(testAreaId).collapsed.get(ROOT_ID);
    expect(after2).toEqual(before);

    let badId = testAreaId + 6;
    let badCollapse = () => {
      actions.collapseArea(badId);
    };
    expect(badCollapse).toThrow(`No item with id = ${badId}`);
  });

  it("should handle collapse story", () => {
    let selector = selectors.getStory;
    let parentId = testAreaId;
    let testId = testStoryId;
    let collapse = actions.collapseStory;

    let before = selector(testId).collapsed.get(parentId);
    expect(before).toEqual(false);
    collapse(parentId, testId);
    let after = selector(testId).collapsed.get(parentId);
    expect(after).toEqual(true);
    collapse(parentId, testId);
    let after2 = selector(testId).collapsed.get(parentId);
    expect(after2).toEqual(false);

    let badId = testId + 6;
    let badCollapse = () => {
      collapse(parentId, badId);
    };
    expect(badCollapse).toThrow(`No item with id = ${badId}`);
  });

  //   it("should handle SET_VISIBILITY", () => {
  //     actions.setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED);
  //     expect(toJS(store().visibilityFilter)).toEqual(VisibilityFilters.SHOW_COMPLETED);
  //   });

  //   it("Selector should work", () => {
  //     actions.setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED);
  //     expect(selectors.getVisibilityFilter()).toEqual(VisibilityFilters.SHOW_COMPLETED);
  //     actions.setVisibilityFilter(VisibilityFilters.SHOW_ACTIVE);
  //     expect(selectors.getVisibilityFilter()).toEqual(VisibilityFilters.SHOW_ACTIVE);
  //   });
});
