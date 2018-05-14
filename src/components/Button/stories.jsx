// @flow strict-local

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  text,
  boolean,
} from '@storybook/addon-knobs';

import Button from '.';

storiesOf('Buttons', module)
  .add('Normal Button', () => (
    <Button
      disabled={boolean('Disabled', false)}
      noink={boolean('No Ink', false)}
      onPress={action('Pressed the Button')}
    >
      {text('Button text', 'Text')}
    </Button>
  ))
  .add('Raised Button', () => (
    <Button
      raised
      disabled={boolean('Disabled', false)}
      noink={boolean('No Ink', false)}
      onPress={action('Pressed the Button')}
    >
      {text('Button text', 'Text')}
    </Button>
  ));
