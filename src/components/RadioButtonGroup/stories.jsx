// @flow strict

import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import RadioButton from '../RadioButton';
import Label from '../Label';

import RadioButtonGroup from '.';

type Props = { color: 'primary' | 'accent' };
type State = { selected: string };

class Story extends React.PureComponent<Props, State> {
  static propTypes = { color: PropTypes.string.isRequired };

  state = { selected: 'test2' };

  handleChange = (name: string) => {
    this.setState({ selected: name });
  };

  render(): Node {
    return (
      <RadioButtonGroup
        selected={this.state.selected}
        onChange={this.handleChange}
      >
        <Label
          disabled
          control={(
            <RadioButton
              color={this.props.color}
              name="test1"
            />
          )}
        >
          Test 1
        </Label>

        <Label
          control={(
            <RadioButton
              color={this.props.color}
              name="test2"
            />
          )}
        >
          Test 2
        </Label>

        <Label
          control={(
            <RadioButton
              color={this.props.color}
              name="test3"
            />
          )}
        >
          Test 3
        </Label>
      </RadioButtonGroup>
    );
  }
}

storiesOf('Selection Elements', module)
  .add('RadioButtons', () => (
    <Story
      color={select('Color', {
        primary: 'Primary',
        accent: 'Accent',
      }, 'primary')}
    />
  ));

