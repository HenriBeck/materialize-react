import React from 'react';
import { storiesOf } from '@storybook/react';

import Stepper from './stepper';

storiesOf('Stepper', module)
  .add('Progress Header', () => (
    <Stepper
      header={<Stepper.Headers.Progress />}
      style={{ width: 400 }}
    >
      <Stepper.Section name="first">
        First Section
      </Stepper.Section>

      <Stepper.Section name="second">
        Second Section
      </Stepper.Section>

      <Stepper.Section name="third">
        Third Section
      </Stepper.Section>
    </Stepper>
  ))
  .add('Dot Header', () => (
    <Stepper
      header={<Stepper.Headers.Dot />}
      style={{ width: 400 }}
    >
      <Stepper.Section name="first">
        First Section
      </Stepper.Section>

      <Stepper.Section name="second">
        Second Section
      </Stepper.Section>

      <Stepper.Section name="third">
        Third Section
      </Stepper.Section>
    </Stepper>
  ))
  .add('Text Header', () => (
    <Stepper
      header={<Stepper.Headers.Text />}
      style={{ width: 400 }}
    >
      <Stepper.Section name="first">
        First Section
      </Stepper.Section>

      <Stepper.Section name="second">
        Second Section
      </Stepper.Section>

      <Stepper.Section name="third">
        Third Section
      </Stepper.Section>
    </Stepper>
  ));
