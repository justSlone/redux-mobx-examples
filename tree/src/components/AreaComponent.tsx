import React from 'react'
import {Story, Area, makeEmptyStory} from '../stores/TreeStoreSchema';
import StoryListContainer from '../containers/StoryListContainer';
import {observer} from 'mobx-react';
import {withStoreContext, StoreContextInterface, replaceProps, injectFromStore} from '../stores/StoreContext';

export interface AreaProps extends Area {
  onClick: ()=> void
  addStory: (s: Story)=> void
  onRemoveClick: ()=>void
  isCollapsed: boolean
  getAllAreas: ()=> Area[]  
}

const S1 = makeEmptyStory();
const S2 = makeEmptyStory();
const S3 = makeEmptyStory();

const AreaComponent: React.FunctionComponent<AreaProps> = ({ id, name, childIds: storyIds, isCollapsed, onClick, addStory, onRemoveClick, getAllAreas}) => (
  <li
    onClick={e=>{e.stopPropagation(); onClick()}}
    style={{
      listStyleType: isCollapsed ? 'disc':'circle'
    }}
  >
    {`${id} : ${name} : ${storyIds.length}`}
    <button onClick={e=>{e.stopPropagation(); addStory(makeEmptyStory())}}>+</button>    
    <button onClick={e=>{e.stopPropagation(); onRemoveClick()}}>-</button>   
    <button onClick={e=>{e.stopPropagation(); addStory(S1)}}>S1</button>&nbsp;
    <button onClick={e=>{e.stopPropagation(); addStory(S2)}}>S2</button>&nbsp;
    <button onClick={e=>{e.stopPropagation(); addStory(S3)}}>S3</button>&nbsp;
    {!isCollapsed && <StoryListContainer storyIds={storyIds} areaId={id}/>}
    {getAllAreas().length}
  </li>
)
// interface NewProps {
//   foo: string
// }
// let inProps = {foo: "foo"};

let injectProps = (ctx: StoreContextInterface)=>({
  getAllAreas: ctx.treeStore.selectors.getAllAreas
})

export default injectFromStore(injectProps)(AreaComponent)
