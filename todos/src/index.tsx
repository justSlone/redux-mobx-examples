import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import App from './components/App'
import {Store, StoreView, StoreActions, StoreState} from './stores'
import { configure } from 'mobx';
configure({enforceActions: "always"});


let mainStore = new Store();
let actions = new StoreActions(mainStore);
console.log(actions);
render(
  <Provider view={new StoreView(mainStore.getState())} actions={actions}>
    <App />    
  </Provider>,
  document.getElementById('root')
)
