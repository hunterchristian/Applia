import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ElementWithEditableContent from '@/renderer/components/StyleEditor/ElementWithEditableContent';
import { RootState } from '@/renderer/store';
import { updateElementStyles } from '@/renderer/store/elements/actions';
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
    <div className="style-editor">
      { Object.keys(styles).map(key => (
          <div className="style-item" key={key}>
            {/* <span className="css-property-label">{ key }:</span> */}
            <ElementWithEditableContent
              text={key}
              className="style-property"
              onBlur={ (updatedKey: string) => {
                const newStyles = { ...styles, [updatedKey]: styles[key] };
                if (updatedKey !== key) {
                  // tslint:disable-next-line: no-dynamic-delete
                  delete newStyles[key];
                }
                dispatch(updateElementStyles(selectedElementId, newStyles));
              }}
            />
            {': '}
            <ElementWithEditableContent
              text={styles[key]}
              onChange={ (text: string) => dispatch(
                updateElementStyles(selectedElementId, { ...styles, [key]: text })
              )}
            />
          </div>))
      }
    </div>
  );
};
