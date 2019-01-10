import React from 'react'
import {Story} from '../stores/TreeStoreSchema';
import StoryList from './StoryList';

export interface AreaProps {
  onClick: ()=> void
  // onRemoveClick: ()=>void  
  id: number,
  name: string,
  collapsed: boolean,
  stories: Story[]  
}

const AreaComponent: React.SFC<AreaProps> = ({ id, name, stories, collapsed, onClick }) => (
  <li
    onClick={e=>{e.stopPropagation(); onClick()}}
    style={{
      listStyleType: collapsed ? 'disc':'circle'
    }}
  >
    {`${id} : ${name} : ${stories.length}`}
    {!collapsed && <StoryList stories={stories}/>}
  </li>
)

export default AreaComponent
