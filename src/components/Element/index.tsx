import autobind from 'auto-bind';
import * as React from 'react';
import { DragElementWrapper, DropTarget, DropTargetCollector, DropTargetConnector, DropTargetMonitor } from 'react-dnd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { SourceProps } from '@/components/ComponentPalette/Element';
import { ItemTypes } from '@/constants';
import { RootState } from '@/store';
import { addElement, toggleSelectedElement } from '@/store/elements/actions';
import { Element as ElementType } from '@/store/elements/types';
import createElement from '@/util/createElement';

interface CollectedProps {
  connectDropTarget: DragElementWrapper<{}>;
  isOver: boolean;
}
interface OwnProps {
  elementId: string;
  children?: React.ReactNode;
}
interface ReduxStateProps {
  element: ElementType;
}
interface DispatchProps {
  addElement(element: ElementType): void;
  toggleSelectedElement(elementId: string): void;
}
type AllComponentProps = CollectedProps & OwnProps & DispatchProps & ReduxStateProps;

type ComponentState = ElementType & {
  isSelected: boolean;
};

const createRandomRBGVal = () => Math.floor(Math.random() * 256);
const createRandomColor = () => `rgb(${createRandomRBGVal()}, ${createRandomRBGVal()}, ${createRandomRBGVal()})`;

const logDrop = (text: string) => console.log(`Drop recorded over element: ${text}`);

const elementTarget = {
  drop(props: AllComponentProps, monitor: DropTargetMonitor) {
    if (!monitor.didDrop()) {
      const droppedItem = monitor.getItem() as SourceProps;
      props.addElement(
        createElement(props.elementId, {
          attrs: { style: { background: createRandomColor() } },
          tag: droppedItem.tag,
        })
      );
      logDrop(droppedItem.tag);
    }
  },
};

const collect: DropTargetCollector<CollectedProps, OwnProps> = (
  dndConnect: DropTargetConnector,
  monitor: DropTargetMonitor
) => ({
  connectDropTarget: dndConnect.dropTarget(),
  isOver: monitor.isOver(),
});

const renderElement = (element: ElementType): JSX.Element => (
  <DroppableElement key={element.id} elementId={element.id}>
    {element.children.map(renderElement)}
  </DroppableElement>
);

class Element extends React.Component<AllComponentProps, ComponentState> {
  constructor(props: AllComponentProps) {
    super(props);
    // Bind all methods to this class
    autobind(this);
    // Copy node into component state so that we can render changes when the observer gets notified
    this.state = { ...props.element };
  }

  onClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.props.toggleSelectedElement(this.props.elementId);
  };

  render() {
    const { connectDropTarget, isOver, element } = this.props;
    const { attrs, children, classes, isSelected, tag } = element;
    const CustomTag = tag;

    return connectDropTarget(
      // @ts-ignore https://github.com/Microsoft/TypeScript/issues/28892
      <CustomTag
        className={`${[...classes].join(' ')}${isOver ? ' hovering ' : ' '}${isSelected ? ' selected ' : ' '}node`}
        onClick={this.onClick}
        {...attrs}
      >
        {children.map(renderElement)}
      </CustomTag>
    );
  }
}

const mapReduxStateToProps = (reduxState: RootState, props: OwnProps): ReduxStateProps => ({
  element: reduxState.elements.elementsById[props.elementId],
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  addElement: (element: ElementType) => dispatch(addElement(element)),
  toggleSelectedElement: (elementId: string) => dispatch(toggleSelectedElement(elementId)),
});

const makeDroppable = DropTarget<AllComponentProps, CollectedProps>(ItemTypes.ELEMENT, elementTarget, collect);
export const DroppableElement = connect(
  mapReduxStateToProps,
  mapDispatchToProps
)(makeDroppable(Element)) as React.ComponentType<OwnProps>;
