import * as React from 'react';
//import PropTypes from 'prop-types';

//import { DragSource } from 'react-dnd';

// bypass TypeScript by using a 'require' rather than 'import'
// TODO: add .scss support to webpack
//const styles = require('./styles.scss')

interface OwnProps {
  name: string;
}

interface DragProps {
  connectDragSource?: any;
  isDragging?: boolean;
}

/**
 * Implements the drag source contract.
 */
const elementComponentSource = {
  beginDrag(props: Props) {
    return {
      text: props.name
    };
  }
};

type Props = OwnProps & DragProps;

// const collect = (connect: any, monitor: any) => ({
//   connectDragSource: connect.dragSource(),
//   isDragging: monitor.isDragging()
// });

class ElementComponent extends React.Component<Props> {
  // static propTypes = {
  //   // Injected by React DnD:
  //   connectDragSource: PropTypes.func.isRequired,
  //   isDragging: PropTypes.bool.isRequired
  // };

  render() {
    const {
      connectDragSource,
      isDragging,
      name
    } = this.props;

    return <div>THIS IS A THING</div>; //connectDragSource && connectDragSource(
      // <div className={ styles.component }
      //style={{ opacity: isDragging ? 0.5 : 1 }}>
      //   { `<${ name }>` }
      // </div>
    //);
  }
}

//export default DragSource('elementComponent',
//elementComponentSource, collect)(ElementComponent);
export { ElementComponent };
