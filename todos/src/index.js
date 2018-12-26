import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import App from './components/App'
import {todoStore, optionsStore} from './stores'
import { configure } from 'mobx';
configure({enforceActions: "always"});

render(
  <Provider todoStore={todoStore} optionsStore={optionsStore}>      
    <App />    
  </Provider>,
  document.getElementById('root')
)
