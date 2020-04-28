import React from 'react';
import ContentEditable from 'react-contenteditable';

interface OwnProps {
  className: string;
  text: string;
  onBlur?(text: string): void;
  onChange?(text: string): void;
}

interface State {
  html: string;
}

class ElementWithEditableContent extends React.Component<OwnProps, State> {
  contentEditableRef: React.RefObject<HTMLElement>;

  constructor(props: OwnProps) {
    super(props);
    this.contentEditableRef = React.createRef();
    this.state = {html: `${ props.text }`};
  }

  handleChange = evt => {
    this.setState({html: evt.target.value});
    if (this.props.onChange) {
      this.props.onChange(evt.target.value);
    }
  };

  handleBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur(this.state.html);
    }
  };

  render = () => (
    <ContentEditable
      className={this.props.className}
      innerRef={this.contentEditableRef}
      html={this.state.html} // innerHTML of the editable div
      disabled={false}       // use true to disable editing
      onBlur={this.handleBlur}
      onChange={this.handleChange} // handle innerHTML change
      tagName="span" // Use a custom HTML tag (uses a div by default)
    />
  );
}

export { ElementWithEditableContent };
