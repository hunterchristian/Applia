/**
 * React renderer.
 */
import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { ComponentPalette } from '@/components/ComponentPalette';
import { DroppableElement } from '@/components/Element';
import { ROOT_EL_ID } from '@/constants';
import { rootReducer } from '@/store';

const store = createStore(rootReducer, devToolsEnhancer({}));

const App = () => (
  <Provider store={store}>
    <div className={'editor'}>
      <ComponentPalette />
      <DroppableElement elementId={ROOT_EL_ID} />
    </div>
  </Provider>
);

const DnDEnabledApp = DragDropContext(HTML5Backend)(App);

export default DnDEnabledApp;
