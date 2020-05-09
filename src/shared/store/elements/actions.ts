import {
  ADD_ELEMENT,
  Element,
  ElementActionTypes,
  TOGGLE_SELECTED_ELEMENT,
  UPDATE_ELEMENT_STYLES,
} from './types';

export const addElement = (element: Element): ElementActionTypes => ({
  type: ADD_ELEMENT,
  payload: element,
});

export const toggleSelectedElement = (id: string): ElementActionTypes => ({
  type: TOGGLE_SELECTED_ELEMENT,
  payload: {
    id,
  },
});

export const updateElementStyles = (id: string, styles: React.CSSProperties): ElementActionTypes => ({
  type: UPDATE_ELEMENT_STYLES,
  payload: {
    id,
    styles,
  },
});
