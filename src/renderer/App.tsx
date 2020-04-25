import * as React from 'react';

import { DroppableElement } from '@/renderer/components/Element';
import { ComponentPalette } from '@components/ComponentPalette';
import { ROOT_EL_ID } from '@renderer/constants';

const App = () => (
  <div className={'editor'}>
    <ComponentPalette />
    <DroppableElement elementId={ROOT_EL_ID} />
  </div>
);

export default App;
