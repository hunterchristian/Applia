import uuid from 'uuid/v4';

class TextNode {
  id: string;
  text: string;

  constructor(text: string) {
    this.id = uuid();
    this.text = text;
  }
}

export { TextNode };
