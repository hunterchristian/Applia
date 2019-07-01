import autobind from 'auto-bind';
import * as React from 'react';
import {
  DragElementWrapper,
  DropTarget,
  DropTargetCollector,
  DropTargetConnector,
  DropTargetMonitor,
} from 'react-dnd';

import { SourceProps } from '@components/ComponentPalette/Element';
import { HTMLNode } from '@models/HTMLNode';
import { ItemTypes } from '@renderer/constants';
import { State } from '@renderer/state';

const state = State.getInstance();
const {
  addHTMLNode,
  registerObserver,
  removeObserver,
  toggleSelectedNode,
  updateNodeStyle,
} = state;

interface CollectedProps {
  connectDropTarget: DragElementWrapper<{}>;
  isOver: boolean;
}
interface OwnProps {
  node: HTMLNode;
  children?: React.ReactNode;
}
type AllComponentProps = CollectedProps & OwnProps;

// TODO: How to allow for functions to be stored as fields on HTMLNode, without omitting them?
// OmitType is used to separate methods from fields on HTMLNode
type ComponentState = OmitType<HTMLNode, Function> & {
  isSelected: boolean;
};

const createRandomRBGVal = () => Math.floor(Math.random() * 256);
const createRandomColor = () => `rgb(${ createRandomRBGVal() }, ${ createRandomRBGVal() }, ${ createRandomRBGVal() })`;

const logDrop = (text: string) =>
  console.log(`Drop recorded over element: ${ text }`);

const elementTarget = {
  drop(props: AllComponentProps, monitor: DropTargetMonitor) {
    if (!monitor.didDrop()) {
      const droppedItem = monitor.getItem() as SourceProps;
      addHTMLNode(props.node.id, droppedItem.tag, { style: { background: createRandomColor() } });
      logDrop(droppedItem.tag);
    }
  },
};

const collect: DropTargetCollector<CollectedProps, OwnProps> =
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  });

const renderNode = (node: HTMLNode): JSX.Element => (
    <DroppableElement key={ node.id } node={ node }>
      { node.children.map(renderNode) }
    </DroppableElement>
  );

class Element extends React.Component<AllComponentProps, ComponentState> {
  constructor(props: AllComponentProps) {
    super(props);
    // Bind all methods to this class
    autobind(this);
    // Copy node into component state so that we can render changes when the observer gets notified
    this.state = {
      ...props.node,
      isSelected: false,
    };
    registerObserver(
      props.node.id,
      this.handleNodeChanged,
      // Cannot call 'setState' on a component that has not yet been mounted
      { shouldInitialize: false }
    );
  }

  componentWillUnmount() {
    removeObserver(this.props.node.id);
  }

  handleNodeChanged(node: HTMLNode) {
    if (node.children.length !== this.state.children.length) {
      this.setState({ children: node.children });
    }
    this.setState({ attrs: node.attrs });
  }

  onClick = (event: MouseEvent) => {
    event.preventDefault();

    const { id } = this.props.node;
    const wasSelected = this.state.isSelected;

    toggleSelectedNode(id);
    this.setState({ isSelected: !wasSelected });
    // updateNodeStyle(id, this.state.isSelected ? selectedStyle : defaultStyle);

    console.log('onClick hit');
  }

  render() {
    const {
      connectDropTarget,
      isOver,
    } = this.props;
    const {
      attrs,
      children,
      isSelected,
      tag,
    } = this.state;
    const CustomTag = tag;

    return connectDropTarget(
      // @ts-ignore https://github.com/Microsoft/TypeScript/issues/28892
      <CustomTag
        className={ `node${ isOver ? ' hovering' : '' } ${ isSelected ? ' selected' : '' }` }
        onClick={ this.onClick }
        { ...attrs }
      >
        { children.map(renderNode) }
      </CustomTag>
    );
  }
}

const makeDroppable = DropTarget<OwnProps, CollectedProps>(ItemTypes.ELEMENT, elementTarget, collect);
export const DroppableElement = makeDroppable(Element) as React.ComponentType<OwnProps>;
