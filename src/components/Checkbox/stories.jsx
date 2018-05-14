// @flow strict-local

import React, { type Node } from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean,
  select,
} from '@storybook/addon-knobs';

import Label from '../Label';

import Checkbox from '.';

type Props = {
  disabled: boolean,
  color: 'primary' | 'accent',
};
type State = { checked: boolean };

class Story extends React.PureComponent<Props, State> {
  state = { checked: false };

  handleChange = () => {
    this.setState((state: State): State => {
      return { checked: !state.checked };
    });
  };

  render(): Node {
    return (
      <Label
        disabled={this.props.disabled}
        control={(
          <Checkbox
            checked={this.state.checked}
            color={this.props.color}
            onChange={this.handleChange}
          />
        )}
      >
        Label
      </Label>
    );
  }
}

storiesOf('Selection Elements', module)
  .add('Checkbox', () => (
    <Story
      disabled={boolean('Disabled', false)}
      color={select('Color', {
        primary: 'Primary',
        accent: 'Accent',
      }, 'primary')}
    />
  ));
