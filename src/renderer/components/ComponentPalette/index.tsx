import * as React from 'react';

import { DraggableElement } from '@components/ComponentPalette/Element';
import { State } from '@renderer/state';
const state = State.getInstance();
const { reset } = state;

export const ComponentPalette = () => (
  <div className={ 'componentPalette' } >
    <DraggableElement tag={ 'div' } />
    <button onClick={ () => reset() } style={{
      position: 'absolute',
      right: '10px',
    }}>reset</button>
  </div>
);
