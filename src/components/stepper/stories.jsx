import React from 'react';
import { storiesOf } from '@storybook/react';

import Stepper from './stepper-container';

const renderStepper = props => () => (
  <Stepper
    style={{ width: 400 }}
    {...props}
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
);

storiesOf('Stepper', module)
  .add('Progress Header', renderStepper({ header: (<Stepper.Headers.Progress />) }))
  .add('Dot Header', renderStepper({ header: (<Stepper.Headers.Dot />) }))
  .add('Text Header', renderStepper({ header: (<Stepper.Headers.Text />) }));
