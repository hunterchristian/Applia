import uuid from 'uuid/v4';

import { Element } from '@/renderer/store/elements/types';

const createElement = (parentId: string, elementParts: Partial<Element>): Element => ({
  ...{
    attrs: {
      style: {},
    },
    children: [],
    classes: new Set(),
    id: uuid(),
    isSelected: false,
    tag: 'div',
  },
  ...elementParts,
  parentId,
});

export default createElement;
