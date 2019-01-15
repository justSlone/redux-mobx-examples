import React from 'react'
import {Target} from '../stores/TreeStoreSchema';
import MeasureList from './MeasureList';

export interface MeasureProps {
  id: number,
  title: string,
  targets: Target[],
  onRemoveClick: ()=>void  
}

const MeasureComponent: React.SFC<MeasureProps> = ({ id, title, targets, onRemoveClick }) => (
  <li
    style={{
      textDecoration: false ? 'line-through' : 'none'
    }}
  >
    {`${id} : ${title} Target=${targets[0].value}`}&nbsp;
    <button onClick={e=>{e.stopPropagation(); onRemoveClick()}}>-</button>
  </li>
)

export default MeasureComponent
