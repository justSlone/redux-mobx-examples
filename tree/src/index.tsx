import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'
import App from './components/App'
import { configure } from 'mobx';
configure({enforceActions: "always"});
import { TreeStore} from './stores/TreeStoreClass';
import { makeEmptyArea, makeEmptyStory, makeEmptyMeasure} from './stores/TreeStoreSchema';

let store = new TreeStore("store");
let area = makeEmptyArea();
let story = makeEmptyStory();
let measure = makeEmptyMeasure();
store.actions.addArea(area);
store.actions.addStory(area.id, story);
store.actions.addMeasure(story.id, measure);

render(
  <Provider store={store} >
    <App />    
  </Provider>,
  document.getElementById('root')
)
