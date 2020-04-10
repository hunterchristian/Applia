/**
 * React renderer.
 */
import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as ReactDOM from 'react-dom';

import { ComponentPalette } from '@components/ComponentPalette';
import { DroppableElement } from '@components/Node';
import { HTMLNode } from '@models/HTMLNode';
// Import the styles here to process them with webpack
import '@public/style.css';
import { State } from '@renderer/state';
const state = State.getInstance();

interface OwnProps {
  rootNode: HTMLNode;
}

const App = (props: OwnProps) => (
  <div className={'editor'}>
    <ComponentPalette />
    <DroppableElement node={props.rootNode} />
  </div>
);

const DnDEnabledApp = DragDropContext(HTML5Backend)(App);

state.registerObserver(
  state.rootNode.id,
  (node) =>
    ReactDOM.render(
      <DnDEnabledApp rootNode={node} />,
      document.getElementById('app')
    ),
  { shouldInitialize: true }
);
