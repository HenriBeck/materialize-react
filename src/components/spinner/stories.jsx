import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { boolean } from '@kadira/storybook-addon-knobs';

import Spinner from './spinner.jsx';

storiesOf('Spinner', module)
  .add('Default styles', () => (
    <Spinner active={boolean('Active', true)} />
  ))
  .add('Different Colors', () => (
    <Spinner
      active={boolean('Active', true)}
      colors={{
        layer1: '#2196f3',
        layer2: '#f44336',
        layer3: '#4caf50',
        layer4: '#ffeb3b',
      }}
    />
  ));
