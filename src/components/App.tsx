import React from 'react';
import { useSelector } from 'react-redux';

import { ComponentPalette } from '@/components/ComponentPalette';
import { DroppableElement } from '@/components/Element';
import StyleEditor from '@/components/StyleEditor';
import { ROOT_EL_ID } from '@/constants';
import { RootState } from '@/store';

export const App = () => {
  const selectedElementId = useSelector((state: RootState) => state.elements.selectedElementId);

  return (
    <div className={'editor'}>
      <ComponentPalette />
      <DroppableElement elementId={ROOT_EL_ID} />
      { selectedElementId ? <StyleEditor selectedElementId={selectedElementId} /> : null }
    </div>
  );
};
