import { ROOT_EL_ID, ROOT_EL_PARENT_ID } from '@renderer/constants';
import createElement from '@renderer/util/createElement';
import {
  AddElementAction,
  ADD_ELEMENT,
  ElementActionTypes,
  ElementsState,
  SelectedElementState,
  ToggleSelectedElementAction,
  TOGGLE_SELECTED_ELEMENT,
} from './types';

const elementsInitialState: ElementsState = {
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
};

const addElement = (state: ElementsState, action: AddElementAction): ElementsState => ({
  ...state,
  // Add the new element to state
  [action.payload.id]: action.payload,
  // Link the new element to an existing node
  [action.payload.parentId]: {
    ...state[action.payload.parentId],
    children: [...state[action.payload.parentId].children, action.payload],
  },
});

const deselectPreviouslySelectedElementIfDifferent = (
  state: ElementsState,
  previouslySelectedElementId: Maybe<string>,
  newlySelectedElementId: string
): ElementsState => {
  let previouslySelectedElement = {};
  if (previouslySelectedElementId && previouslySelectedElementId !== newlySelectedElementId) {
    previouslySelectedElement = {
      [previouslySelectedElementId]: {
        ...state[previouslySelectedElementId],
        isSelected: false,
      },
    };
  }

  return previouslySelectedElement;
};

const toggleSelectedElement = (
  state: ElementsState,
  action: ToggleSelectedElementAction,
  selectedElementId: string
): ElementsState => ({
  ...state,
  [action.payload.id]: {
    ...state[action.payload.id],
    isSelected: !state[action.payload.id].isSelected,
  },
  ...deselectPreviouslySelectedElementIfDifferent(state, selectedElementId, action.payload.id),
});

const elementsByIdReducer = (
  state = elementsInitialState,
  action: ElementActionTypes,
  selectedElementId: string
): ElementsState => {
  switch (action.type) {
    case ADD_ELEMENT:
      return addElement(state, action as AddElementAction);
    case TOGGLE_SELECTED_ELEMENT:
      return toggleSelectedElement(state, action as ToggleSelectedElementAction, selectedElementId);
    default:
      return state;
  }
};

const selectedElementIdInitialState = '';
const selectedElementIdReducer = (
  state = selectedElementIdInitialState,
  action: ElementActionTypes
): SelectedElementState => {
  switch (action.type) {
    case TOGGLE_SELECTED_ELEMENT:
      return action.payload.id === state ? '' : action.payload.id;
    default:
      return state;
  }
};

const rootInitialState = {
  elementsById: elementsInitialState,
  selectedElementId: selectedElementIdInitialState,
};
export const elementsReducer = (state = rootInitialState, action: ElementActionTypes) => ({
  elementsById: elementsByIdReducer(state.elementsById, action, state.selectedElementId),
  selectedElementId: selectedElementIdReducer(state.selectedElementId, action),
});
