// @flow strict

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  boolean,
  select,
} from '@storybook/addon-knobs';

import Icon from '../Icon';

import Fab from '.';

storiesOf('Buttons', module)
  .add('FAB', () => (
    <Fab
      color={select('Color', {
        primary: 'Primary',
        accent: 'Accent',
      }, 'primary')}
      mini={boolean('Mini', false)}
      onPress={action('Press')}
    >
      <Icon>plus</Icon>
    </Fab>
  ));
