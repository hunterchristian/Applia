import * as uuid from 'uuid/v4';

class CanvasNode {
  id: string;

  constructor() {
    this.id = uuid();
  }
}

export { CanvasNode };
