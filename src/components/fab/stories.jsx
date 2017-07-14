import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Fab from './fab';

storiesOf('FAB', module)
  .add('Default styles', () => (
    <Fab icon="pencil" />
  ))
  .add('Disabled', () => (
    <Fab
      disabled
      icon="pencil"
    />
  ))
  .add('Animate in', () => (
    <Fab
      animateIn
      icon="pencil"
    />
  ))
  .add('With Action', () => (
    <Fab
      icon="pencil"
      onPress={action('Clicked!')}
    />
  ))
  .add('Mini', () => (
    <Fab
      mini
      icon="pencil"
    />
  ));
