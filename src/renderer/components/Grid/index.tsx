import * as React from 'react';
import {
  DragElementWrapper,
  DropTarget,
  DropTargetCollector,
  DropTargetConnector,
  DropTargetMonitor,
} from 'react-dnd';

import { SourceProps } from '@components/ComponentPalette/Element';
import { HTMLNode, Tag } from '@models/CanvasNode/HTMLNode';
import { ItemTypes } from '@renderer/constants';
import { addHTMLNode } from '@renderer/state';

import { Element } from './Element';

interface OwnProps {
  rootNode: HTMLNode;
}

const renderNode = (node: HTMLNode): JSX.Element => (
  <Element key={ node.id } node={ node }>
    { node.children.map(renderNode) }
  </Element>
);

const Grid = ({ rootNode }: OwnProps) => (
  <div className={ 'grid' } >
    { renderNode(rootNode) }
  </div>
);

export { Grid };
