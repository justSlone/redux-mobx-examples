import React from 'react'
import StoryComponent from './StoryComponent'
import { Story, Measure } from '../stores/TreeStoreSchema'
import { observer } from 'mobx-react';

export interface StoryListProps {
  areaId: number
  stories: Story[]
  addMeasure: (sid: number, m: Measure)=>void
  removeStory: (aid: number, sid: number)=>void
  collapseStory: (aid: number, sid: number)=>void
  isCollapsed: (story: Story)=>boolean
}

const StoryList: React.FunctionComponent<StoryListProps> = ({ areaId, stories, addMeasure, removeStory, collapseStory, isCollapsed}) => (
  <ul>
    {stories.map((story: Story) => {      
      return (            
        <StoryComponent key={story.id} {...story}
        addMeasure={(m: Measure)=>{addMeasure(story.id, m)}}    
        onRemoveClick={()=>removeStory(areaId, story.id)}
        onClick={()=>{collapseStory(areaId, story.id)}}
        isCollapsed={isCollapsed(story)}
        measureCount={story.childIds.length} //  IDK if this is good
        />    
      )
      })
  }
  </ul>
)

export default observer(StoryList)


