import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';

import Stepper from './stepper';

/**
 * The story for the stepper component.
 *
 * @class
 */
class Story extends PureComponent {
  state = { section: 0 };

  back = () => this.setState((state) => {
    return { section: state.section - 1 };
  });

  forward = () => this.setState((state) => {
    return { section: state.section + 1 };
  });

  render() {
    return (
      <Stepper
        style={{ width: 400 }}
        section={this.state.section}
        headerProps={{
          back: this.back,
          forward: this.forward,
        }}
        {...this.props}
      >
        <Stepper.Section>
          First Section
        </Stepper.Section>

        <Stepper.Section>
          Second Section
        </Stepper.Section>

        <Stepper.Section>
          Third Section
        </Stepper.Section>
      </Stepper>
    );
  }
}

storiesOf('Stepper', module)
  .add('Progress Header', () => (
    <Story header={Stepper.Headers.Progress} />
  ))
  .add('Dot Header', () => (
    <Story header={Stepper.Headers.Dot} />
  ))
  .add('Text Header', () => (
    <Story header={Stepper.Headers.Text} />
  ));
