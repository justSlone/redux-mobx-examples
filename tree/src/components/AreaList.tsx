import React from 'react'
import AreaComponent from './AreaComponent'
import { Area } from '../stores/TreeStoreSchema'
import { observer } from 'mobx-react'; 
import {store} from '../stores'

export interface AreaList {
  areas: Area[]    
}

const AreaList: React.SFC<AreaList> = ({ areas }) => (
  <ul>
    {areas.map(area =>      
      <AreaComponent key={area.id} {...area} onClick={()=>(store.actions.collapseNode(area))}/>
    )}
  </ul>
)

// Not very happy about having to observe here, but it's because we don't derefernce the array
export default observer(AreaList)
