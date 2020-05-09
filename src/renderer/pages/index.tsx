/**
 * React renderer.
 */
import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  forwardToMain,
  replayActionRenderer,
  getInitialStateRenderer,
} from 'electron-redux';

import { App } from '@/renderer/components/App';
import { rootReducer } from '@/shared/store';

import '../fonts.scss';

// https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

// https://github.com/hardchor/electron-redux
const initialState = getInitialStateRenderer();

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(forwardToMain))
);

replayActionRenderer(store);

const AppWithRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const DnDEnabledApp = DragDropContext(HTML5Backend)(AppWithRedux);

export default DnDEnabledApp;
