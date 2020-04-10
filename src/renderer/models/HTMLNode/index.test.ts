import { HTMLNode } from './index';

const DEFAULT_ATTRS = {
  style: {
    width: '100px',
    height: '100px',
    background: 'yellow',
  },
};
const createHTMLNode = () => new HTMLNode('div', DEFAULT_ATTRS);

describe('HTMLNode', () => {
  describe('#updateStyle()', () => {
    test('should overwrite existing styles with new styles', () => {
      const node = createHTMLNode();
      const newStyle = { width: '50px', height: '50px' };
      node.updateStyle(newStyle);

      // @ts-ignore Override strict null checks
      const { width, height, background } = node.attrs.style;
      expect(width).toEqual(newStyle.width);
      expect(height).toEqual(newStyle.height);
    });

    test('should preserve any existing attributes which are not present in the set of new attributes', () => {
      const node = createHTMLNode();
      const newStyle = { width: '50px', height: '50px' };
      node.updateStyle(newStyle);

      // @ts-ignore Override strict null checks
      const { background } = node.attrs.style;
      expect(background).toEqual('yellow');
    });
  });
});
