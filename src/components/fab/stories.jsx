import React from 'react';
import {
  storiesOf,
  action,
} from '@kadira/storybook';

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
      icon="pencil"
      animateIn
    />
  ))
  .add('With Action', () => (
    <Fab
      icon="pencil"
      onClick={action('Clicked!')}
    />
  ))
  .add('Mini', () => (
    <Fab
      mini
      icon="pencil"
    />
  ));
