import React from 'react'
import StoryComponent from './StoryComponent'
import { Story } from '../stores/TreeStoreSchema'
import { observer } from 'mobx-react'; 
import {store} from '../stores';

export interface StoryList {
  stories: Story[]    
}

// ()=>(store.actions.collapseStory(story.id))
// ()=>(story.collapsed = !story.collapsed)
const StoryList: React.SFC<StoryList> = ({ stories }) => (
  <ul>
    {stories.map(story =>      
      <StoryComponent key={story.id} {...story} 
      measureCount={store.selectors.getMeasureCount(story)} 
      onClick={()=>(store.actions.collapseNode(story))} 
      onAddClick={()=>{store.actions.addMeasure(story)}}
      removeFromStory={
        (measureId: number)=>{store.actions.removeMeasureFromStory(story, measureId)}
      } 
      />
    )}
  </ul>
)

// Not very happy about having to observe here, but it's because we don't derefernce the array
export default observer(StoryList)
