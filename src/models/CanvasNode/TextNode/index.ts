import { CanvasNode } from '@models/CanvasNode';

class TextNode extends CanvasNode {
  text: string;

  constructor(text: string) {
    super();

    this.text = text;
  }
}

export { TextNode };
