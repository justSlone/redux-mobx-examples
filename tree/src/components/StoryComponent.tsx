import React from 'react'
import {Measure, makeEmptyMeasure} from '../stores/TreeStoreSchema';
import MeasureListContainer from '../containers/MeasureListContainer';


export interface StoryProps {
  onClick: ()=> void  
  onRemoveClick: ()=> void
  addMeasure: (m: Measure)=>void
  id: number,
  title: string,
  measureCount: number,  
  childIds: number[]  
  isCollapsed: boolean
}

const M1 = makeEmptyMeasure();
const M2 = makeEmptyMeasure();
const M3 = makeEmptyMeasure();


const StoryComponent: React.SFC<StoryProps> = ({ id, title, childIds: measureIds, isCollapsed, onClick, addMeasure, onRemoveClick, measureCount}) => (
  <li    
    onClick={e=>{e.stopPropagation(); onClick()}}
    style={{
      listStyleType: isCollapsed ? 'disc':'circle'
    }}
  >
    {`${id} : ${title} : ${measureCount}`}&nbsp;
    <button onClick={e=>{e.stopPropagation(); addMeasure(makeEmptyMeasure())}}>+</button>&nbsp;
    <button onClick={e=>{e.stopPropagation(); onRemoveClick()}}>-</button>   
    <button onClick={e=>{e.stopPropagation(); addMeasure(M1)}}>M1</button>&nbsp;
    <button onClick={e=>{e.stopPropagation(); addMeasure(M2)}}>M2</button>&nbsp;
    <button onClick={e=>{e.stopPropagation(); addMeasure(M3)}}>M3</button>&nbsp;
    {!isCollapsed && <MeasureListContainer measureIds={measureIds} storyId={id}/>}
  </li>
)


// @observer
// class StoryComponent extends React.Component<StoryProps> {
//   @observable
//   localIsCollapsed = false;
  
//   @action
//   toggleCollapse = () => {
//     this.localIsCollapsed = !this.localIsCollapsed;
//   }
    
//   render() {
//     let { id, title, childIds: measureIds, addMeasure, onRemoveClick, isCollapsed, onClick} = this.props;
//     return (<li    
//       onClick={e=>{e.stopPropagation(); onClick() }}
//       style={{
//         listStyleType: isCollapsed ? 'disc':'circle'
//       }}      
//     >
//       {`${id} : ${title} : ${measureIds.length}`}&nbsp;
//       <button onClick={e=>{e.stopPropagation(); addMeasure(makeEmptyMeasure())}}>+</button>&nbsp;
//       <button onClick={e=>{e.stopPropagation(); onRemoveClick()}}>-</button>   
//       <button onClick={e=>{e.stopPropagation(); addMeasure(M1)}}>M1</button>&nbsp;
//       <button onClick={e=>{e.stopPropagation(); addMeasure(M2)}}>M2</button>&nbsp;
//       <button onClick={e=>{e.stopPropagation(); addMeasure(M3)}}>M3</button>&nbsp;
//       {!isCollapsed && <MeasureListContainer measureIds={measureIds} storyId={id}/>}
//     </li>)
//   }   
// }

export default StoryComponent
