/**
 * React renderer.
 */
import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as ReactDOM from 'react-dom';

import { ComponentPalette } from '@components/ComponentPalette';
import { Grid } from '@components/Grid';
import {
  Elements,
  observe,
} from '@renderer/state';

// Import the styles here to process them with webpack
import '@public/style.css';

interface OwnProps {
  elements: Elements;
}

const App = (props: OwnProps) => (
  <div className={ 'editor' }>
    <ComponentPalette />
    <Grid elements={ props.elements } />
  </div>
);

const DnDEnabledApp = DragDropContext(HTML5Backend)(App);

observe(elements => (
  ReactDOM.render(
    <DnDEnabledApp elements={ elements } />,
    document.getElementById('app')
  )
));
