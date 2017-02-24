import React from 'react';
import {
  storiesOf,
  action,
} from '@kadira/storybook';

import RadioButtonGroup from './radio-button-group.jsx';
import RadioButton from '../radio-button';

storiesOf('RadioButtonGroup', module)
  .add('Default styles', () => (
    <RadioButtonGroup name="test">
      <RadioButton name="button1">Button 1</RadioButton>
      <RadioButton name="button2">Button 2</RadioButton>
      <RadioButton name="button3">Button 3</RadioButton>
    </RadioButtonGroup>
  ))
  .add('Default selected', () => (
    <RadioButtonGroup
      name="test"
      defaultSelected="button2"
    >
      <div>Some Content</div>
      <RadioButton name="button1">Button 1</RadioButton>
      <RadioButton name="button2">Button 2</RadioButton>
      <RadioButton name="button3">Button 3</RadioButton>
    </RadioButtonGroup>
  ))
  .add('With callback', () => (
    <RadioButtonGroup
      name="test"
      defaultSelected="button2"
      onChange={action('Changed!')}
    >
      <RadioButton name="button1">Button 1</RadioButton>
      <RadioButton name="button2">Button 2</RadioButton>
      <RadioButton name="button3">Button 3</RadioButton>
    </RadioButtonGroup>
  ))
  .add('With label', () => (
    <RadioButtonGroup
      name="test"
      label="Some Label"
    >
      <RadioButton name="button1">Button 1</RadioButton>
      <RadioButton name="button2">Button 2</RadioButton>
      <RadioButton name="button3">Button 3</RadioButton>
    </RadioButtonGroup>
  ));