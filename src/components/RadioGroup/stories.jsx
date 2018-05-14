// @flow strict-local

import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import Radio from '../Radio';
import Label from '../Label';

import RadioGroup from '.';

type Props = { color: 'primary' | 'accent' };
type State = { selected: string };

class Story extends React.PureComponent<Props, State> {
  state = { selected: 'test2' };

  handleChange = (name: string) => {
    this.setState({ selected: name });
  };

  render(): Node {
    return (
      <RadioGroup
        selected={this.state.selected}
        onChange={this.handleChange}
      >
        <Label
          disabled
          control={(
            <Radio
              color={this.props.color}
              name="test1"
            />
          )}
        >
          Test 1
        </Label>

        <Label
          control={(
            <Radio
              color={this.props.color}
              name="test2"
            />
          )}
        >
          Test 2
        </Label>

        <Label
          control={(
            <Radio
              color={this.props.color}
              name="test3"
            />
          )}
        >
          Test 3
        </Label>
      </RadioGroup>
    );
  }
}

storiesOf('Selection Elements', module)
  .add('RadioGroup', () => (
    <Story
      color={select('Color', {
        primary: 'Primary',
        accent: 'Accent',
      }, 'primary')}
    />
  ));

