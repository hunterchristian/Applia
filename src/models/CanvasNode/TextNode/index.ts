import { CanvasNode } from '@models/CanvasNode';

class TextNode extends CanvasNode {
  text: string;

  constructor(depth: number, text: string) {
    super(depth);

    this.text = text;
  }
}

export { TextNode };
