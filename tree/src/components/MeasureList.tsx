import React from 'react'
import MeasureComponent from './MeasureComponent'
import { Measure } from '../stores/TreeStoreSchema'
import { observer } from 'mobx-react'; 
import { store} from '../stores';

export interface MeasureList {
  // removeFromStory: (measureId: number)=>void
  measureIds: number[],
  storyId: number
}

const MeasureList: React.SFC<MeasureList> = ({ measureIds, storyId}) => (
  <ul>
    {store.selectors.getMeasures(measureIds).map( measure =>      
      <MeasureComponent key={measure.id} {...measure} onRemoveClick={()=>{store.actions.removeMeasure(storyId, measure.id)}}  />
    )}
  </ul>
)

// Not very happy about having to observe here, but it's because we don't derefernce the array
export default observer(MeasureList)
