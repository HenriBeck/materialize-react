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
      icon={text('Icon', 'chevron-down')}
      disabled={boolean('Disabled', false)}
      size={number('Size', 24)}
    />
  ));
