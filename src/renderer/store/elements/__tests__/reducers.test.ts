import { ROOT_EL_ID, ROOT_EL_PARENT_ID } from '@renderer/constants';
import createElement from '@renderer/util/createElement';

import * as actions from '../actions';
import { elementsReducer } from '../reducers';
import { ElementActionTypes } from '../types';

describe('elements reducer', () => {
  it('should return the initial state', () => {
    const defaultAction = {};
    const received = elementsReducer(undefined, defaultAction as ElementActionTypes);
    const expected = {
      elementsById: {
        [ROOT_EL_ID]: createElement(ROOT_EL_PARENT_ID, {
          attrs: {
            style: {
              display: 'flex',
              flex: 1,
              margin: 0,
            },
          },
          id: ROOT_EL_ID,
        }),
      },
      selectedElementId: '',
    };

    expect(received).toEqual(expected);
  });

  it('should handle ADD_ELEMENT', () => {
    const element = createElement(ROOT_EL_ID, {
      id: 'test-element',
    });

    const received = elementsReducer(undefined, actions.addElement(element));
    const expected = {
      elementsById: {
        [ROOT_EL_ID]: createElement(ROOT_EL_PARENT_ID, {
          attrs: {
            style: {
              display: 'flex',
              flex: 1,
              margin: 0,
            },
          },
          id: ROOT_EL_ID,
          children: [element],
        }),
        [element.id]: element,
      },
      selectedElementId: '',
    };

    expect(received).toEqual(expected);
  });

  it('should handle TOGGLE_SELECTED_ELEMENT when no other element is selected', () => {
    const received = elementsReducer(undefined, actions.toggleSelectedElement(ROOT_EL_ID));
    const expected = {
      elementsById: {
        [ROOT_EL_ID]: createElement(ROOT_EL_PARENT_ID, {
          attrs: {
            style: {
              display: 'flex',
              flex: 1,
              margin: 0,
            },
          },
          id: ROOT_EL_ID,
          isSelected: true,
        }),
      },
      selectedElementId: ROOT_EL_ID,
    };

    expect(received).toEqual(expected);
  });

  it('should handle TOGGLE_SELECTED_ELEMENT when another element is currently selected', () => {
    const element = createElement(ROOT_EL_ID, {
      id: 'test-element',
    });
    const elementAdded = elementsReducer(undefined, actions.addElement(element));
    const rootElSelected = elementsReducer(elementAdded, actions.toggleSelectedElement(ROOT_EL_ID));

    const received = elementsReducer(rootElSelected, actions.toggleSelectedElement(element.id));
    const expected = {
      elementsById: {
        [ROOT_EL_ID]: createElement(ROOT_EL_PARENT_ID, {
          attrs: {
            style: {
              display: 'flex',
              flex: 1,
              margin: 0,
            },
          },
          children: [element],
          id: ROOT_EL_ID,
          isSelected: false,
        }),
        [element.id]: {
          ...element,
          isSelected: true,
        },
      },
      selectedElementId: element.id,
    };

    expect(received).toEqual(expected);
  });

  it('should handle TOGGLE_SELECTED_ELEMENT when an element is selected twice consecutively', () => {
    const rootElSelected = elementsReducer(undefined, actions.toggleSelectedElement(ROOT_EL_ID));
    const received = elementsReducer(rootElSelected, actions.toggleSelectedElement(ROOT_EL_ID));
    const expected = {
      elementsById: {
        [ROOT_EL_ID]: createElement(ROOT_EL_PARENT_ID, {
          attrs: {
            style: {
              display: 'flex',
              flex: 1,
              margin: 0,
            },
          },
          id: ROOT_EL_ID,
          isSelected: false,
        }),
      },
      selectedElementId: '',
    };

    expect(received).toEqual(expected);
  });
});
