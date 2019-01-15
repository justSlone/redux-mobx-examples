import React from 'react'
import StoryComponent from './StoryComponent'
import { Story, makeEmptyMeasure, Measure } from '../stores/TreeStoreSchema'
import { observer, inject } from 'mobx-react';
// import { store } from '../stores';
import { observable, IObservableValue, runInAction} from 'mobx';

export interface StoryListProps {
  areaId: number
  stories: Story[]
  addMeasure: (sid: number, m: Measure)=>void
  removeStory: (aid: number, sid: number)=>void
  collapseStory: (aid: number, sid: number)=>void
}

// ()=>(store.actions.collapseStory(story.id))
// ()=>(story.collapsed = !story.collapsed)
const StoryList: React.FunctionComponent<StoryListProps> = ({ areaId, stories, addMeasure, removeStory, collapseStory }) => (
  <ul>
    {stories.map((story: Story) => {      
      return (            
        <StoryComponent key={story.id} {...story}               
        //onAddClick={()=>{store.actions.addMeasure(story.id, makeEmptyMeasure())}}    
        addMeasure={(m: Measure)=>{addMeasure(story.id, m)}}    
        onRemoveClick={()=>removeStory(areaId, story.id)}
        onClick={()=>{collapseStory(areaId, story.id)}}
        isCollapsed={story.collapsed.get(areaId)!}
        />    
      )
      })
  }
  </ul>
)

// Not very happy about having to observe here, but it's because we don't derefernce the array
export default StoryList


