// @flow strict

import React, { type Node } from 'react';
import { storiesOf } from '@storybook/react';
import {
  select,
  boolean,
} from '@storybook/addon-knobs';

import Label from '../Label';

import Switch from '.';

type Props = {
  disabled: boolean,
  color: 'primary' | 'accent',
};
type State = { toggled: boolean };

class Story extends React.PureComponent<Props, State> {
  state = { toggled: false };

  handleChange = () => {
    this.setState((state: State): State => {
      return { toggled: !state.toggled };
    });
  };

  render(): Node {
    return (
      <Label
        disabled={this.props.disabled}
        control={(
          <Switch
            toggled={this.state.toggled}
            color={this.props.color}
            onChange={this.handleChange}
          />
        )}
      >
        Some Label
      </Label>
    );
  }
}

storiesOf('Selection Elements', module)
  .add('Switch', () => (
    <Story
      color={select('Color', {
        primary: 'Primary',
        accent: 'Accent',
      }, 'primary')}
      disabled={boolean('Disabled', false)}
    />
  ));
