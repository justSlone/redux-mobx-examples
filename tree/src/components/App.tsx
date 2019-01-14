import React from 'react'
import DevTools from 'mobx-react-devtools'
import AreaList from './AreaList';
import { store } from '../stores';

const App = () => (
  <div>
    Hello    
    <AreaList areaIds={store.getState().root.childIds} />        
    <DevTools />
  </div>
)

export default App