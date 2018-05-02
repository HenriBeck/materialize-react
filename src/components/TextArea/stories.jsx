// @flow strict

import React, { type Node } from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean,
  text,
  select,
} from '@storybook/addon-knobs';

import TextArea from '.';

type Props = {
  label: Node,
  error: Node,
  helperText: Node,
  disabled: boolean,
  color: 'primary' | 'accent',
};
type State = { value: string };

class Story extends React.PureComponent<Props, State> {
  state = { value: '' };

  handleChange = (ev) => {
    this.setState({ value: ev.target.value });
  };

  render() {
    return (
      <TextArea
        label={this.props.label}
        error={this.props.error}
        helperText={this.props.helperText}
        disabled={this.props.disabled}
        color={this.props.color}
        value={this.state.value}
        textareaProps={{
          style: {
            height: 200,
            width: 300,
          },
        }}
        onChange={this.handleChange}
        {...this.props}
      />
    );
  }
}

storiesOf('Text Fields', module)
  .add('TextArea', () => (
    <Story
      label={text('Label', 'Label')}
      error={text('Error')}
      helperText={text('Helper Text')}
      disabled={boolean('Disabled', false)}
      color={select('Color', {
        primary: 'Primary',
        accent: 'Accent',
      }, 'primary')}
    />
  ));
