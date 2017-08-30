import React from 'react';
import { storiesOf } from '@storybook/react';

import Stepper from './stepper';
import DotHeader from './dot-header';
import ProgressHeader from './progress-header';

storiesOf('Stepper', module)
  .add('Progress Header', () => (
    <Stepper
      header={<ProgressHeader />}
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
      header={<DotHeader />}
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
