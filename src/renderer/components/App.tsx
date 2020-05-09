import React from 'react';
import { useSelector } from 'react-redux';

import { ComponentPalette } from '@/renderer/components/ComponentPalette';
import { DroppableElement } from '@/renderer/components/Element';
import StyleEditor from '@/renderer/components/StyleEditor';
import { ROOT_EL_ID } from '@/renderer/constants';
import { RootState } from '@/renderer/store';

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
