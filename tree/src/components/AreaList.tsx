import React, {ReactNode}from 'react'
import AreaComponent from './AreaComponent'
import { Area, makeEmptyArea, Story, ROOT_ID, TreeState} from '../stores/TreeStoreSchema'
import { observer } from 'mobx-react'; 

export interface AreaListProps {
  areas: Area[]
  debugElement: JSX.Element
  collapseArea: (id:number)=>void
  addStory: (id:number, s:Story)=>void
  removeArea: (id:number)=>void
  addArea: ()=>void
}

const AreaList: React.SFC<AreaListProps> = ({ areas, debugElement, collapseArea, addStory, removeArea, addArea }) => (
  <div>
    {/* Only for debugging it makes this component listen to almost all changes */}
    {/* Areas: {store.getState().areas.size} Stories: {store.getState().stories.size} Measures: {store.getState().measures.size} */}
    {debugElement}
    <br/>      
    <button onClick={e=>{e.stopPropagation();addArea();}}>Add Area</button>   
    <ul>
    {areas.map((area) =>      
      <AreaComponent key={area.id} {...area} 
      isCollapsed={area.collapsed.get(ROOT_ID)!}
      onClick={()=>collapseArea(area.id)}
      addStory={(s: Story)=>addStory(area.id, s)}
      onRemoveClick={()=>removeArea(area.id)}
      />
    )}
  </ul>
  </div>

)

// Not very happy about having to observe here, but it's because we don't derefernce the array
export default (AreaList)

