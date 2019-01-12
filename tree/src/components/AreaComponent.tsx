import React from 'react'
import {Story, Area} from '../stores/TreeStoreSchema';
import StoryList from './StoryList';

export interface AreaProps extends Area {
  onClick: ()=> void
  // onRemoveClick: ()=>void  
}

const AreaComponent: React.SFC<AreaProps> = ({ id, name, childIds: storyIds, collapsed, onClick }) => (
  <li
    onClick={e=>{e.stopPropagation(); onClick()}}
    style={{
      listStyleType: collapsed ? 'disc':'circle'
    }}
  >
    {`${id} : ${name} : ${storyIds.length}`}
    {!collapsed && <StoryList storyIds={storyIds}/>}
  </li>
)

export default AreaComponent
