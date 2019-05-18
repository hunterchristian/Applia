import {
  createRootNode,
  HTMLNode,
  Tag,
} from '@models/CanvasNode/HTMLNode';

type Observer = (rootNode: HTMLNode) => void;

let rootNode: HTMLNode = createRootNode();
const quickLookup: Map<string, HTMLNode> = new Map<string, HTMLNode>();
quickLookup.set(rootNode.id, rootNode);

let observer: Nullable<Observer> = null;

const emitChange = () => {
  if (!observer) {
    throw new Error('Observer does not exist. Did you call observe() yet?');
  }
  observer(rootNode);
};

export const observe = (o: Observer) => {
  if (observer) {
    throw new Error('Observer already exists. Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
};

export const addHTMLNode = (parentId: string, tag: Tag, attrs: React.HTMLAttributes<HTMLElement>) => {
  const parent = quickLookup.get(parentId);
  if (parent) {
    const newNode = new HTMLNode(tag, attrs);
    parent.addChild(newNode);
    quickLookup.set(newNode.id, newNode);
  } else {
    throw new Error(`Could not find CanvasNode for given id: ${ parentId }`);
  }

  emitChange();
};

export const reset = () => {
  rootNode = createRootNode();
  quickLookup.clear();
  quickLookup.set(rootNode.id, rootNode);
  emitChange();
};
