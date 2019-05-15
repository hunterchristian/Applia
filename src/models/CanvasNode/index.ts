import * as uuid from 'uuid/v4';

class CanvasNode {
  children: CanvasNode[];
  depth: number;
  id: string;

  constructor(depth: number, children?: CanvasNode[]) {
    this.children = children || [];
    this.depth = depth;
    this.id = uuid();
  }
}

export { CanvasNode };
