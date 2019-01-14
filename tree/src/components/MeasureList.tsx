import React from 'react'
import MeasureComponent from './MeasureComponent'
import { Measure } from '../stores/TreeStoreSchema'
import { observer, inject } from 'mobx-react'; 

export interface MeasureList {
  // removeFromStory: (measureId: number)=>void
  measureIds: number[],
  storyId: number
}

const MeasureList: React.SFC<MeasureList> = inject("store")(observer(({ store, measureIds, storyId}) => (
  <ul>
    {store.selectors.getMeasures(measureIds).map( (measure: Measure) =>      
      <MeasureComponent key={measure.id} {...measure} onRemoveClick={()=>{store.actions.removeMeasure(storyId, measure.id)}}  />
    )}
  </ul>
)))

// Not very happy about having to observe here, but it's because we don't derefernce the array
export default MeasureList
