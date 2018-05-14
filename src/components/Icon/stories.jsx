// @flow strict-local

import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean,
  number,
  text,
} from '@storybook/addon-knobs';

import Icon from '.';

storiesOf('Basic Elements', module)
  .add('Icon', () => (
    <Icon
      disabled={boolean('Disabled', false)}
      size={number('Size', 24)}
    >
      {text('Icon', 'chevron-down')}
    </Icon>
  ));
