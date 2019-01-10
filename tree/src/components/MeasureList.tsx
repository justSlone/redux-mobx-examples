import React from 'react'
import MeasureComponent from './MeasureComponent'
import { Measure } from '../stores/TreeStoreSchema'
import { observer } from 'mobx-react'; 
import { store} from '../stores';

export interface MeasureList {
  removeFromStory: (measureId: number)=>void
  measures: Measure[]
}

const MeasureList: React.SFC<MeasureList> = ({ removeFromStory, measures }) => (
  <ul>
    {measures.map(measure =>      
      <MeasureComponent key={measure.id} {...measure} 
      onRemoveClick={()=>{removeFromStory(measure.id)}}/>
    )}
  </ul>
)

// Not very happy about having to observe here, but it's because we don't derefernce the array
export default observer(MeasureList)
