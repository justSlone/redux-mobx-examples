import React from 'react'
import {Measure} from '../stores/TreeStoreSchema';
import MeasureList from './MeasureList';

export interface StoryProps {
  onClick: ()=> void
  onAddClick: ()=> void
  removeFromStory: (measureId: number)=>void
  id: number,
  title: string,
  measureCount: number,
  measures: Measure[],
  collapsed: boolean
}

const StoryComponent: React.SFC<StoryProps> = ({ id, title, measureCount, measures, collapsed,  onClick, onAddClick, removeFromStory}) => (
  <li    
    onClick={e=>{e.stopPropagation(); onClick()}}
    style={{
      listStyleType: collapsed ? 'disc':'circle'
    }}
  >
    {`${id} : ${title} : ${measureCount}`}&nbsp;
    <button onClick={e=>{e.stopPropagation();onAddClick()}}>+</button>    
    {!collapsed && <MeasureList measures={measures} removeFromStory={removeFromStory}/>}
  </li>
)

export default StoryComponent
