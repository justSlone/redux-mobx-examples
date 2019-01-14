import React from 'react'
import StoryComponent from './StoryComponent'
import { Story, makeEmptyMeasure, Measure } from '../stores/TreeStoreSchema'
import { observer, inject } from 'mobx-react';
// import { store } from '../stores';
import { observable, IObservableValue, runInAction} from 'mobx';

export interface StoryList {
  storyIds: number[]
  areaId: number
}

// ()=>(store.actions.collapseStory(story.id))
// ()=>(story.collapsed = !story.collapsed)
const StoryList: React.SFC<StoryList> = inject("store")(observer(({ store, storyIds, areaId }) => (
  <ul>
    {store.selectors.getStories(storyIds).map((story: Story) => {      
      return (            
        <StoryComponent key={story.id} {...story}               
        //onAddClick={()=>{store.actions.addMeasure(story.id, makeEmptyMeasure())}}    
        addMeasure={(m: Measure)=>{store.actions.addMeasure(story.id, m)}}    
        onRemoveClick={()=>store.actions.removeStory(areaId, story.id)}
        onClick={()=>{store.actions.collapseStory(areaId, story.id)}}
        isCollapsed={story.collapsed.get(areaId)!}
        />    
      )
      })
  }
  </ul>
)))

// Not very happy about having to observe here, but it's because we don't derefernce the array
export default StoryList
