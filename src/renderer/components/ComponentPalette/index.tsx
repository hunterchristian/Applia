import * as React from 'react';

import {
  Element
} from '@components/ComponentPalette/Element';
import { reset } from '@renderer/state';

export const ComponentPalette = () => (
  <div className={ 'componentPalette' } style={{ display: 'flex', justifyContent: 'center' }}>
    <Element tagName={ 'div' } />
    <button onClick={ reset } style={{
      position: 'absolute',
      right: '10px',
    }}>reset</button>
  </div>
);
