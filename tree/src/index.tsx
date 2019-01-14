import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import App from './components/App'
import { configure } from 'mobx';
import {store} from './stores';
configure({enforceActions: "always"});
import { TreeStore} from './stores/TreeStoreClass';

render(
  <Provider store={new TreeStore("store")} >
    <App />    
  </Provider>,
  document.getElementById('root')
)
