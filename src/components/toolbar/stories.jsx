import React from 'react';
import { storiesOf } from '@storybook/react';

import Toolbar from './toolbar';

storiesOf('Toolbar', module)
  .add('Default styles', () => (
    <Toolbar>
      <div className="row">
        Title
      </div>
    </Toolbar>
  ))
  .add('Medium tall', () => (
    <Toolbar height="medium-tall">
      <div className="row">
        Row 1
      </div>

      <div className="row">
        Row 2
      </div>
    </Toolbar>
  ))
  .add('Tall', () => (
    <Toolbar height="tall">
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
    <Toolbar noShadow>
      <div>
        Title
      </div>
    </Toolbar>
  ));
