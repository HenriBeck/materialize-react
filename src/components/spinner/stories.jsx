import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  boolean,
} from '@storybook/addon-knobs';

import Spinner from './spinner';

storiesOf('Spinner', module)
  .addDecorator(withKnobs)
  .add('Default styles', () => (
    <Spinner active={boolean('Active', true)} />
  ));
