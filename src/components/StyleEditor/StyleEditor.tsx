import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EditableLabel from '@/components/StyleEditor/EditableLabel';
import { RootState } from '@/store';
import { updateElementStyles } from '@/store/elements/actions';
import './StyleEditor.scss';

interface OwnProps {
  selectedElementId: string;
}

export const StyleEditor = ({ selectedElementId }: OwnProps) => {
  const dispatch = useDispatch();
  const styles = useSelector(
    (state: RootState) => state.elements.elementsById[selectedElementId].attrs.style
  ) as Record<string, string>;

  return (
    <div className={'style-editor'}>
      { Object.keys(styles).map(key => (
          <div key={key}>
            {/* <span className="css-property-label">{ key }:</span> */}
            <EditableLabel
              text={key}
              onBlur={ updatedKey => dispatch(
                updateElementStyles(selectedElementId, { ...styles, [updatedKey]: styles[key] })
              )}
            />
            {':'}
            <EditableLabel
              text={styles[key]}
              onChange={ text => dispatch(
                updateElementStyles(selectedElementId, { ...styles, [key]: text })
              )}
            />
          </div>))
      }
    </div>
  );
};
