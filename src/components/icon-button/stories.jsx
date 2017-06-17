import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import IconButton from './icon-button';

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
