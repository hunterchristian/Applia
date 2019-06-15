import { State } from '@renderer/state';
const state = State.getInstance();
const {
  addHTMLNode,
  getRootNode,
  nodeStore,
} = state;

const mockNotifyObserver = () => {
  const mock = jest.fn();
  const original = state.notifyObserver;
  state.notifyObserver = mock;

  return original;
};
const restoreNotifyObserver = (original: typeof state.notifyObserver) =>
  state.notifyObserver = original;

describe('Canvas state', () => {
  test('should initialize a root node', () => {
    expect(getRootNode()).toBeDefined();
  });
  test('should add the root node to the node store', () => {
    const rootNode = getRootNode();
    const result = nodeStore.get(rootNode.id);
    expect(result).toBeDefined();
    expect(result).toEqual(rootNode);
  });

  describe('#addHTMLNode', () => {
    let original: typeof state.notifyObserver;
    beforeAll(() => original = mockNotifyObserver());
    afterAll(() => restoreNotifyObserver(original));
    afterEach(() => state.reset());

    test('should add a new HTML node to the rootNode', () => {
      const rootNode = getRootNode();
      const childNode = addHTMLNode(rootNode.id, 'div', { style: { background: 'hotpink' } });
      expect(rootNode.children.length).toEqual(1);
      expect(rootNode.children[0].id).toEqual(childNode.id);
    });

    test('should add a new HTML node to the collection of nodes', () => {
      const rootNode = getRootNode();
      const childNode = addHTMLNode(rootNode.id, 'div', { style: { background: 'hotpink' } });
      expect(nodeStore.get(childNode.id)).toEqual(childNode);
    });
  });
});
