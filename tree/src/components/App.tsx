import React from 'react'
import DevTools from 'mobx-react-devtools'
import AreaListContainer from '../containers/AreaListContainer';
// import { store } from '../stores';
import {inject} from 'mobx-react';

const App = inject("store")(({store}) => (
  <div>
    Hello    
    <AreaListContainer areaIds={store.getState().root.childIds} />        
    <DevTools />
  </div>
))

export default App