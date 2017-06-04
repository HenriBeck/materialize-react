import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './button';

storiesOf('Button', module)
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
    <Button
      onPress={action('Pressed the button')}
      onRelease={action('Released the button')}
    >
      Click me!
    </Button>
  ));
