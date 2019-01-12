import React from 'react'
import StoryComponent from './StoryComponent'
import { Story } from '../stores/TreeStoreSchema'
import { observer } from 'mobx-react';
import { store } from '../stores';

export interface StoryList {
  storyIds: number[]
}

// ()=>(store.actions.collapseStory(story.id))
// ()=>(story.collapsed = !story.collapsed)
const StoryList: React.SFC<StoryList> = ({ storyIds }) => (
  <ul>
    {store.selectors.getStories(storyIds).map(story => (
      <StoryComponent key={story.id} {...story} onClick={()=>{store.actions.collapseStory(story.id)}}
      />
    )
    )}
  </ul>
)

// Not very happy about having to observe here, but it's because we don't derefernce the array
export default observer(StoryList)
