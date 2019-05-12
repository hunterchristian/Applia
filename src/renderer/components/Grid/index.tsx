import * as React from 'react';
import {
  DragElementWrapper,
  DropTarget,
  DropTargetCollector,
  DropTargetConnector,
  DropTargetMonitor,
} from 'react-dnd';

import { SourceProps } from '@components/ComponentPalette/Element';
import { ItemTypes } from '@renderer/constants';
import {
  addTagName,
  Elements,
  TagName,
} from '@renderer/state';

interface CollectedProps {
  connectDropTarget: DragElementWrapper<{}>;
  isOver: boolean;
}
interface OwnProps {
  elements: Elements;
}
type AllComponentProps = CollectedProps & OwnProps;

const logDrop = (text: string) =>
  console.log(`Drop recorded: ${ text }`);

const gridTarget = {
  drop(props: SourceProps, monitor: DropTargetMonitor) {
    addTagName(monitor.getItem().tagName);
    logDrop(monitor.getItem().tagName);
  },
};

const collect: DropTargetCollector<CollectedProps, SourceProps> =
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  });

const Grid = DropTarget(ItemTypes.ELEMENT, gridTarget, collect)(({
  connectDropTarget,
  elements,
  isOver,
}: AllComponentProps) => (
  connectDropTarget(
    <div className={ 'grid' }>
      { elements.map((Tag: TagName) =>
        <Tag style={{
          height: '50px',
          width: '50px',
          background: 'hotpink',
          border: 'solid 2px black',
          display: 'inline-block',
        }} />) }
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }}
        />
      )}
    </div>
  )
));

export { Grid };
