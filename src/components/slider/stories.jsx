import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Slider from './slider';

const style = { width: 260 };

/**
 * The story for the slider component.
 *
 * @class
 */
class Story extends PureComponent {
  state = { value: 0 };

  /**
   * Change the state when the user interacts with the slider.
   *
   * @param {Number} value - The new value.
   */
  handleChange = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Slider
        value={this.state.value}
        style={style}
        onChange={this.handleChange}
        {...this.props}
      />
    );
  }
}

storiesOf('Slider', module)
  .add('Default Styles', () => (
    <Story disabled={boolean('Disabled', false)} />
  ));
