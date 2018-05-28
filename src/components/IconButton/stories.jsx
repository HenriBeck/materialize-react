// @flow strict-local

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  boolean,
  number,
} from '@storybook/addon-knobs';
import { PencilIcon } from 'mdi-react';

import Icon from '../Icon';

import IconButton from '.';

storiesOf('Buttons', module)
  .add('IconButton', () => (
    <IconButton
      disabled={boolean('Disabled', false)}
      size={number('Size', 48)}
      onPress={action('Click')}
    >
      <Icon size={number('Icon size', 24)}>
        <PencilIcon />
      </Icon>
    </IconButton>
  ));
