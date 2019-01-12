import { TreeStoreTemplate } from "./TreeStore";
import { TreeState, Area, Story, Measure, makeEmptyArea, makeEmptyStory, makeEmptyMeasure } from './TreeStoreSchema'
import { realizeMixedStore, createStoreFromTemplate } from './StoreHelper';
import { toJS, ObservableMap } from 'mobx';
import { action } from 'satcheljs';
import {first, get} from 'lodash';


const initialState: TreeState = {
    areas: new Map<number, Area>(),
    stories: new Map<number, Story>(),
    measures: new Map<number, Measure>(),
    parentIds: [],
    childIds: [],
    id: -1
};

// class TodoStoreClass extends realizeMixedStore(FilterStore) {}
// let storeClass = new TodoStoreClass("filterStore", initialFilterState);
// var store = storeClass.getState;
// let actions = storeClass.actions;
// let selectors = storeClass.selectors;
TreeStoreTemplate.initialState = initialState;

let { store: { getState, actions, selectors } } = createStoreFromTemplate("name", TreeStoreTemplate)

describe("todo store", () => {
    let testAreaId = 123;
    let testStoryId = 456;
    let testMeasureId = 789;

    it("should handle empty getAreas", () => {
        expect(selectors.getAreas([testAreaId])).toEqual([]);
    });

    it("should handle add area", () => {
        let newArea = makeEmptyArea()
        newArea.id = testAreaId;
        actions.addArea(newArea);
        expect(selectors.getAreas([newArea.id])).toEqual([newArea]);
    });
    
    it("should handle add story", () => {
        let newStory = makeEmptyStory()
        newStory.id = testStoryId;
        actions.addStory(testAreaId, newStory);
        expect(selectors.getAreas([testAreaId])[0].childIds).toEqual([testStoryId]);
        expect(selectors.getStories([testStoryId])).toEqual([newStory]);
    });

    it("should handle add story to invalid area", () => {
        let badGroupId = testAreaId+4;
        let newId = testStoryId+8;
        let newStory = makeEmptyStory()
        newStory.id = newId;
        let badAdd = () =>  actions.addStory(badGroupId, newStory)
        expect(badAdd).toThrow(`No item with id = ${badGroupId}`)

        // Confirm no changes
        expect(selectors.getAreas([testAreaId])[0].childIds).toEqual([testStoryId]);
        expect(selectors.getStories([newId])).toEqual([]);
    });

    it("should handle add measure", () => {
        let newMeasure = makeEmptyMeasure()
        newMeasure.id = testMeasureId;
        actions.addMeasure(testStoryId, newMeasure);
        expect(selectors.getStories([testStoryId])[0].childIds).toEqual([newMeasure.id]);
        expect(selectors.getMeasures([testMeasureId])).toEqual([newMeasure]);
    });

    it("should handle add measure to invalid story", () => {
        let badStoryId = testStoryId+6;
        let newMesureId = testMeasureId+9;
        let newMeasure = makeEmptyMeasure()
        newMeasure.id = newMesureId;
        let badAddMeasure = () =>  actions.addMeasure(badStoryId, newMeasure)
        expect(badAddMeasure).toThrow(`No item with id = ${badStoryId}`)
        
        // Confirm no changes
        expect(selectors.getStories([testStoryId])[0].childIds).toEqual([testMeasureId]);
        expect(selectors.getMeasures([newMesureId])).toEqual([]);
    });

    it("should handle remove measure", () => {
        let parentId = testStoryId;
        let childId = testMeasureId+67;
        let newMeasure = makeEmptyMeasure()
        newMeasure.id = childId;

        actions.addMeasure(parentId, newMeasure);
        expect(selectors.getStory(parentId).childIds).toEqual([testMeasureId, childId]);
        expect(selectors.getMeasure(childId).parentIds).toEqual([parentId]);
        expect(selectors.getMeasure(childId)).toEqual(newMeasure);

        actions.removeMeasure(parentId, childId);
        expect(selectors.getStory(parentId).childIds).toEqual([testMeasureId]);
        expect(()=>selectors.getMeasure(childId).parentIds).toThrow(`No item with id = ${childId}`);
    });

    it("should handle remove measure from 1 of 2 stories", () => {
        let parentId = testStoryId+99;
        let childId = testMeasureId+88;
        let newStory = makeEmptyStory();
        newStory.id = parentId;
        let newMeasure = makeEmptyMeasure();
        newMeasure.id = childId;

        actions.addStory(testAreaId, newStory);
        expect(selectors.getArea(testAreaId).childIds).toEqual([parentId]);
        expect(selectors.getStory(parentId).parentIds).toEqual([testAreaId]);

        actions.addMeasure(parentId, newMeasure);
        expect(selectors.getStory(parentId).childIds).toEqual([]);
        expect(selectors.getMeasure(childId).parentIds).toEqual([parentId]);
        expect(selectors.getMeasure(childId)).toEqual(newMeasure);

        actions.removeMeasure(parentId, childId);
        expect(selectors.getStory(parentId).childIds).toEqual([testMeasureId]);
        expect(()=>selectors.getMeasure(childId).parentIds).toThrow(`No item with id = ${childId}`);
    });

    it("should handle collapse area", () => {
        let before = selectors.getAreas([testAreaId])[0].collapsed;
        actions.collapseArea(testAreaId);
        let after = selectors.getAreas([testAreaId])[0].collapsed;
        expect(after).toEqual(!before);
        actions.collapseArea(testAreaId);
        let after2 = selectors.getAreas([testAreaId])[0].collapsed;
        expect(after2).toEqual(before);

        let badId = testAreaId+6;
        let badCollapse = () => {actions.collapseArea(badId)}
        expect(badCollapse).toThrow(`No item with id = ${badId}`)
    })

    it("should handle collapse story", () => {
        let selector = selectors.getStory;
        let testId = testStoryId;
        let collapse = actions.collapseStory;

        let before = selector(testId).collapsed;
        collapse(testId);
        let after = selector(testId).collapsed;
        expect(after).toEqual(!before);
        collapse(testId);
        let after2 = selector(testId).collapsed;
        expect(after2).toEqual(before);

        let badId = testId+6;
        let badCollapse = () => {collapse(badId)}
        expect(badCollapse).toThrow(`No item with id = ${badId}`)
    })
 
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
