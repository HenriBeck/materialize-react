// @flow strict-local

import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean,
  select,
} from '@storybook/addon-knobs';

import Spinner from '.';

const colorOptions = {
  primary: 'Primary',
  accent: 'Accent',
};

storiesOf('Progress & Activity', module)
  .add('Spinner', () => (
    <Spinner
      active={boolean('Active', true)}
      color={select('Color', colorOptions, 'primary')}
    />
  ));
