import * as React from 'react';
import {
  DragElementWrapper,
  DropTarget,
  DropTargetCollector,
  DropTargetConnector,
  DropTargetMonitor,
} from 'react-dnd';

import { HTMLNode, Tag } from '@/models/CanvasNode/HTMLNode';
import { SourceProps } from '@components/ComponentPalette/Element';
import { CanvasNode } from '@models/CanvasNode';
import { ItemTypes } from '@renderer/constants';
import { addHTMLNode } from '@renderer/state';

interface CollectedProps {
  connectDropTarget: DragElementWrapper<{}>;
  isOver: boolean;
}
interface OwnProps {
  node: HTMLNode;
  children?: React.ReactNode;
}
type AllComponentProps = CollectedProps & OwnProps;

const logDrop = (text: string) =>
  console.log(`Drop recorded over element: ${ text }`);

const defaultStyle: React.CSSProperties = {
  background: 'yellow',
  margin: '15px',
  border: 'solid 2px black',
  display: 'flex',
  flexGrow: 1,
  alignItems: 'stretch',
};

const elementTarget = {
  drop(props: AllComponentProps, monitor: DropTargetMonitor) {
    if (!monitor.didDrop()) {
      addHTMLNode(props.node.id, monitor.getItem().tag, { style: defaultStyle });
      logDrop(monitor.getItem().tag);
    }
  },
};

const collect: DropTargetCollector<CollectedProps, OwnProps> =
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  });

export const Element = DropTarget(ItemTypes.ELEMENT, elementTarget, collect)(({
  children,
  connectDropTarget,
  isOver,
  node,
}: AllComponentProps) => {
  const TagEl = node.tag;

  return connectDropTarget(
    // @ts-ignore https://github.com/Microsoft/TypeScript/issues/28892
    <TagEl
      className={ `element ${ isOver ? 'hovering' : '' }` }
      { ...node.attrs }
    >
      { children }
    </TagEl>
  );
});
