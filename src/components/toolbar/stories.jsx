import React from 'react';
import { storiesOf } from '@storybook/react';

import Toolbar from './toolbar';

const style = { alignSelf: 'flex-start' };

storiesOf('Toolbar', module)
  .add('Default styles', () => (
    <Toolbar style={style}>
      <div>
        Title
      </div>
    </Toolbar>
  ))
  .add('Medium', () => (
    <Toolbar
      height="medium"
      style={style}
    >
      <div>
        Title
      </div>
    </Toolbar>
  ))
  .add('Tall', () => (
    <Toolbar
      height="tall"
      style={style}
    >
      <div>
        Title
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
