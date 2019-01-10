import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import App from './components/App'
import {MixedStore, store} from './stores'
import { configure } from 'mobx';
configure({enforceActions: "always"});

render(
  <Provider store={store} >
    <App />    
  </Provider>,
  document.getElementById('root')
)
