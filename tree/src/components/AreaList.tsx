import React from 'react'
import AreaComponent from './AreaComponent'
import { Area, makeEmptyArea, Story, ROOT_ID} from '../stores/TreeStoreSchema'
import { observer } from 'mobx-react'; 
import {store} from '../stores'
import {DeepReadonly} from 'ts-essentials'

export interface AreaList {
  areaIds: number[]
}

const addArea = () =>{
  store.actions.addArea(makeEmptyArea())
}

const AreaList: React.SFC<AreaList> = ({ areaIds }) => (
  <div>
    {/* Only for debugging it makes this component listen to almost all changes */}
    {/* Areas: {store.getState().areas.size} Stories: {store.getState().stories.size} Measures: {store.getState().measures.size} */}
    <br/>      
    <button onClick={e=>{e.stopPropagation();addArea();}}>Add Area</button>   
    <ul>
    {store.selectors.getAreas(areaIds).map(area =>      
      <AreaComponent key={area.id} {...area} 
      isCollapsed={area.collapsed.get(ROOT_ID)!}
      onClick={()=>{store.actions.collapseArea(area.id)}}
      addStory={(s: Story)=>{store.actions.addStory(area.id, s)}}
      onRemoveClick={()=>store.actions.removeArea(area.id)}
      />
    )}
  </ul>
  </div>

)

// Not very happy about having to observe here, but it's because we don't derefernce the array
export default observer(AreaList)
