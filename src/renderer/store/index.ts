import { combineReducers } from 'redux';

import { elementsReducer } from './elements/reducers';

export const rootReducer = combineReducers({
  elements: elementsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
