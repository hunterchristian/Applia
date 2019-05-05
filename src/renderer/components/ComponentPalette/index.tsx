import * as React from 'react';

import {
  ElementComponent
} from '@components/ComponentPalette/ElementComponent';

// bypass TypeScript by using a 'require' rather than 'import'
// TODO: add .scss support to webpack
//const styles = require('./styles.scss')

export const ComponentPalette = () => (
  <div className={ 'componentPalette' }>
    <div className={ 'component' }> =div= </div>
    <div className={ 'component' }> =div= </div>
    <div className={ 'component' }> =div= </div>
    <div className={ 'component' }> =div= </div>
    <div className={ 'component' }> =div= </div>
    <div className={ 'component' }> =div= </div>
    <div className={ 'component' }> =div= </div>
    <div className={ 'component' }> =div= </div>
  </div>
);
