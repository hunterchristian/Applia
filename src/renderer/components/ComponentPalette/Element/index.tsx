import * as React from 'react';
import {
  ConnectDragSource,
  DragSource,
  DragSourceConnector,
  DragSourceMonitor,
} from 'react-dnd';

import { ItemTypes } from '@renderer/constants';

interface DragProps {
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
}
interface OwnProps {
  tagName: string;
}
export interface SourceProps {
  tagName: string;
}

type AllComponentProps = OwnProps & DragProps;

const mapDragProps = (connect: DragSourceConnector, monitor: DragSourceMonitor): DragProps => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

/**
 * Implement the drag source contract.
 */
const elementSource = {
  beginDrag: (props: AllComponentProps): SourceProps => ({ tagName: props.tagName }),
};

const Element = DragSource(ItemTypes.ELEMENT, elementSource, mapDragProps)(({
  connectDragSource,
  isDragging,
  tagName,
}: AllComponentProps) => (
  connectDragSource(<div style={{
    opacity: isDragging ? 0.5 : 1,
    display: 'inline-block',
  }}>
    { tagName }
  </div>)
));

export { Element };
