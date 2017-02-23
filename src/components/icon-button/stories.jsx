import React from 'react';
import {
  storiesOf,
  action,
} from '@kadira/storybook';

import IconButton from './icon-button.jsx';

storiesOf('IconButton', module)
  .add('Default styles', () => (
    <IconButton icon="pencil" />
  ))
  .add('Disabled', () => (
    <IconButton
      disabled
      icon="pencil"
    />
  ))
  .add('With Action', () => (
    <IconButton
      icon="pencil"
      onPress={action('Clicked the button')}
    />
  ));
