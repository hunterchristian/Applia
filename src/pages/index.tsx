/**
 * React renderer.
 */
import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { App } from '@/components/App';
import { rootReducer } from '@/store';

import '../fonts.scss';

const store = createStore(rootReducer, devToolsEnhancer({}));

const AppWithRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

const DnDEnabledApp = DragDropContext(HTML5Backend)(AppWithRedux);

export default DnDEnabledApp;
