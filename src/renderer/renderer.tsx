/**
 * React renderer.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ComponentPalette } from '@components/ComponentPalette';
import { Grid } from '@components/Grid';

// Import the styles here to process them with webpack
import '@public/style.css';

ReactDOM.render(
  <div className={ 'editor' }>
    <ComponentPalette />
    <Grid />
  </div>,
  document.getElementById('app')
);
