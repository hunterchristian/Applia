import autobind from 'auto-bind';

import { logAction } from '@decorators/logAction';
import {
  HTMLNode,
  Tag,
} from '@models/HTMLNode';

type Observer = (rootNode: HTMLNode) => void;
interface RegisterObserverOptions {
  shouldInitialize: boolean;
}

const createRootNode = (): HTMLNode =>
  new HTMLNode('div', { style: {
    display: 'flex',
    flex: 1,
    background: 'red',
  }});

class State {
  static instance: Nullable<State> = null;
  nodeStore: Map<string, HTMLNode>;
  rootNode: HTMLNode;
  selectedNode: Nullable<HTMLNode>;
  observers: Map<string, Observer>;

  constructor() {
    this.rootNode = createRootNode();
    this.nodeStore = new Map<string, HTMLNode>();
    this.nodeStore.set(this.rootNode.id, this.rootNode);
    this.selectedNode = null;
    this.observers = new Map<string, Observer>();

    // Bind all methods to this class
    autobind(this);
  }

  @logAction
  addHTMLNode(parentId: string, tag: Tag, attrs: React.HTMLAttributes<HTMLElement>) {
    const parent = this.getNode(parentId);
    const newNode = new HTMLNode(tag, attrs);
    parent.addChild(newNode);
    this.nodeStore.set(newNode.id, newNode);
    this.notifyObserver(parentId);

    return newNode;
  }

  notifyObserver(nodeId: string) {
    if (!this.observers.size) {
      throw new Error('Map of observers is empty. Did you call observe() yet?');
    }
    const { observer, node } = this.getNodeAndObserverForNodeId(nodeId);
    observer(node);
  }

  getNode(nodeId: string) {
    const node = this.nodeStore.get(nodeId);
    if (!node) {
      throw new Error(`Could not find CanvasNode for given id: ${ nodeId }`);
    }

    return node;
  }

  getNodeAndObserverForNodeId(nodeId: string) {
    const observer = this.observers.get(nodeId);
    const node = this.nodeStore.get(nodeId);
    if (!observer) {
      throw new Error(`Could not find observer for given nodeId: ${ nodeId }`);
    }
    if (!node) {
      throw new Error(`Could not find node for given nodeId: ${ nodeId }`);
    }

    return { observer, node };
  }

  getRootNode() {
    return this.rootNode;
  }

  @logAction
  registerObserver(nodeId: string, o: Observer, options: RegisterObserverOptions) {
    this.observers.set(nodeId, o);
    if (options.shouldInitialize) {
      this.notifyObserver(nodeId);
    }
  }

  @logAction
  removeObserver(nodeId: string) {
    const didDelete = this.observers.delete(nodeId);
    if (!didDelete) {
      console.error(`Could not find observer for node ID: ${ nodeId }, observer not deleted`);
    }
  }

  @logAction
  toggleSelectedNode(nodeId: string) {
    if (this.selectedNode && this.selectedNode.id === nodeId) {
      this.selectedNode = null;

      return;
    }
    const node = this.getNode(nodeId);
    this.selectedNode = node;
    this.notifyObserver(nodeId);
  }

  @logAction
  updateNodeStyle(nodeId: string, updates: React.CSSProperties) {
    const node = this.getNode(nodeId);
    node.updateStyle(updates);
    this.nodeStore.set(nodeId, node);
    this.notifyObserver(nodeId);
  }

  @logAction
  reset() {
    this.rootNode.children = [];
    this.selectedNode = null;
    this.notifyObserver(this.rootNode.id);
  }

  static getInstance() {
    if (this.instance === null) {
      this.instance = new State();
    }

    return this.instance;
  }
}

export { State };
