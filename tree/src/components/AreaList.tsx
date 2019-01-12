import React from 'react'
import AreaComponent from './AreaComponent'
import { Area, makeEmptyArea} from '../stores/TreeStoreSchema'
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
    <button onClick={e=>{e.stopPropagation();addArea();}}>Add Area</button>   
    <ul>
    {store.selectors.getAreas(areaIds).map(area =>      
      <AreaComponent key={area.id} {...area} onClick={()=>{store.actions.collapseArea(area.id)}}/>
    )}
  </ul>
  </div>

)

// Not very happy about having to observe here, but it's because we don't derefernce the array
export default observer(AreaList)
