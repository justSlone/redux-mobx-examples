import React from 'react'
import {Measure} from '../stores/TreeStoreSchema';
import MeasureList from './MeasureList';

export interface StoryProps {
  onClick: ()=> void
  // onAddClick: ()=> void
  //removeFromStory: (measureId: number)=>void
  id: number,
  title: string,
  // measureCount: number,
  collapsed: boolean,
  childIds: number[]
}

const StoryComponent: React.SFC<StoryProps> = ({ id, title, childIds: measureIds, collapsed, onClick }) => (
  <li    
    onClick={e=>{e.stopPropagation(); onClick()}}
    style={{
      listStyleType: collapsed ? 'disc':'circle'
    }}
  >
    {`${id} : ${title} : ${measureIds.length}`}&nbsp;
    {/* <button onClick={e=>{e.stopPropagation();onAddClick()}}>+</button>     */}
    {!collapsed && <MeasureList measureIds={measureIds} storyId={id}/>}
  </li>
)

export default StoryComponent
