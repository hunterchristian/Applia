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
  tag: string;
}
export interface SourceProps {
  tag: string;
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
  beginDrag: (props: AllComponentProps): SourceProps => ({ tag: props.tag }),
};

const Element = DragSource(ItemTypes.ELEMENT, elementSource, mapDragProps)(({
  connectDragSource,
  isDragging,
  tag,
}: AllComponentProps) => (
  connectDragSource(<div style={{
    opacity: isDragging ? 0.5 : 1,
    display: 'inline-block',
    border: '1px solid black',
    borderRadius: '2px',
    background: 'rgba(0,0,0,.3)',
    padding: '5px 10px',
    color: 'white',
    cursor: '-webkit-grab',
  }}>
    { tag }
  </div>)
));

export { Element };