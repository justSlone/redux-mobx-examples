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
  isCollapsed: (area: Area)=>boolean
}

const AreaList: React.SFC<AreaListProps> = ({ areas, debugElement, collapseArea, addStory, removeArea, addArea, isCollapsed }) => (
  <div>
    {/* Only for debugging it makes this component listen to almost all changes */}
    {/* Areas: {store.getState().areas.size} Stories: {store.getState().stories.size} Measures: {store.getState().measures.size} */}
    {debugElement}
    <br/>      
    <button onClick={e=>{e.stopPropagation();addArea();}}>Add Area</button>   
    <ul>
    {areas.map((area) =>      
      <AreaComponent key={area.id} {...area} 
      isCollapsed={isCollapsed(area)}
      onClick={()=>collapseArea(area.id)}
      addStory={(s: Story)=>addStory(area.id, s)}
      onRemoveClick={()=>removeArea(area.id)}
      />
    )}
  </ul>
  </div>

)

// Has to be observer to observe isCollapsed since we can't determine whether a node is collapsed in the container.
// Technically this break the container pattern since we should in this case have another container for AreaComponent
// However that would be crazy, so this is really a good example of why it's OK to break the container pattern a little
export default observer(AreaList)

