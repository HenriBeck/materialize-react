import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  boolean,
} from '@storybook/addon-knobs';

import Button from './button';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('Flat Button', () => (
    <Button>
      Test
    </Button>
  ))
  .add('Raised button', () => (
    <Button raised>
      Raised
    </Button>
  ))
  .add('Disabled button', () => (
    <Button disabled>
      Disabled
    </Button>
  ))
  .add('Raised and Disabled button', () => (
    <Button
      disabled
      raised
    >
      Disabled
    </Button>
  ))
  .add('Button without ink', () => (
    <Button noink>
      No ink
    </Button>
  ))
  .add('Button with callbacks', () => (
    <Button onPress={action('Pressed the button')}>
      Click me!
    </Button>
  ))
  .add('Interactive', () => (
    <Button
      noink={boolean('No Ink', false)}
      disabled={boolean('Disabled', false)}
    >
      {text('Button text', 'Text')}
    </Button>
  ));
