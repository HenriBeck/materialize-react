import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Toolbar from './toolbar';

storiesOf('Toolbar', module)
  .add('Default styles', () => (
    <Toolbar>
      Some Content
    </Toolbar>
  ));
