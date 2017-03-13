import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { boolean } from '@kadira/storybook-addon-knobs';

import Spinner from './spinner.jsx';

storiesOf('Spinner', module)
  .add('Default styles', () => (
    <Spinner active={boolean('Active', true)} />
  ));
