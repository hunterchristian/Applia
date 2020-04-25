/**
 * React renderer.
 */
import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import App from '@renderer/App';
import { rootReducer } from '@renderer/store';

// Import the styles here to process them with webpack
import '@public/style.css';

const store = createStore(rootReducer, devToolsEnhancer({}));

const DnDEnabledApp = DragDropContext(HTML5Backend)(App);

render(
  <Provider store={store}>
    <DnDEnabledApp />
  </Provider>,
  document.getElementById('app')
);
