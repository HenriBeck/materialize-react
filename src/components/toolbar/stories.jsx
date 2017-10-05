import React from 'react';
import { storiesOf } from '@storybook/react';

import Toolbar from './toolbar';

const style = { alignSelf: 'flex-start' };

storiesOf('Toolbar', module)
  .add('Default styles', () => (
    <Toolbar style={style}>
      <div className="row">
        Title
      </div>
    </Toolbar>
  ))
  .add('Medium tall', () => (
    <Toolbar
      height="medium-tall"
      style={style}
    >
      <div className="row">
        Row 1
      </div>

      <div className="row">
        Row 2
      </div>
    </Toolbar>
  ))
  .add('Tall', () => (
    <Toolbar
      height="tall"
      style={style}
    >
      <div className="row">
        Row 1
      </div>

      <div className="row">
        Row 2
      </div>

      <div className="row">
        Row 3
      </div>
    </Toolbar>
  ))
  .add('No shadow', () => (
    <Toolbar
      noShadow
      style={style}
    >
      <div>
        Title
      </div>
    </Toolbar>
  ));
