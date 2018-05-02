// @flow strict

import React, { type Node } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Slider from '.';

class Story extends React.PureComponent<{}, { value: number }> {
  state = { value: 50 };

  handleChange = (value: number) => {
    this.setState({ value });
  };

  render(): Node {
    return (
      <Slider
        value={this.state.value}
        style={{ width: 260 }}
        onChange={this.handleChange}
        {...this.props}
      />
    );
  }
}

storiesOf('Interactive Elements', module)
  .add('Slider', () => (
    <Story disabled={boolean('Disabled', false)} />
  ));
