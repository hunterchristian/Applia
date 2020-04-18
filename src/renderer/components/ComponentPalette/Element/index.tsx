import * as React from 'react';
import { ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';

import { Tag } from '@models/HTMLNode';
import { ItemTypes } from '@renderer/constants';

interface DragProps {
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
}
interface OwnProps {
  tag: Tag;
}
export interface SourceProps {
  tag: Tag;
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
const Element = ({ connectDragSource, isDragging, tag }: AllComponentProps) =>
  connectDragSource(
    <div
      className={'palette-element'}
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {`<${tag}>`}
    </div>
  );

const makeDraggable = DragSource(ItemTypes.ELEMENT, elementSource, mapDragProps);
export const DraggableElement = makeDraggable(Element) as React.ComponentType<OwnProps>;
