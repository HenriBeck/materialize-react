// @flow strict-local

import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean,
  number,
} from '@storybook/addon-knobs';
import { ChevronDownIcon } from 'mdi-react';

import Icon from '.';

storiesOf('Basic Elements', module)
  .add('Icon', () => (
    <Icon
      disabled={boolean('Disabled', false)}
      size={number('Size', 24)}
    >
      <ChevronDownIcon />
    </Icon>
  ));
