import { ADD_ELEMENT, Element, ElementActionTypes, TOGGLE_SELECTED_ELEMENT } from './types';

export const addElement = (element: Element): ElementActionTypes => ({
  type: ADD_ELEMENT,
  payload: element,
});

export const toggleSelectedElement = (elementId: string): ElementActionTypes => ({
  type: TOGGLE_SELECTED_ELEMENT,
  payload: {
    id: elementId,
  },
});
