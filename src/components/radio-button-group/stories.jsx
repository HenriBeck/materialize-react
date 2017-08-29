import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RadioButton from '../radio-button';

import RadioButtonGroup from './radio-button-group';

storiesOf('RadioButtonGroup', module)
  .add('Default styles', () => (
    <RadioButtonGroup
      name="test"
      defaultSelected="test2"
      label="Test"
    >
      <RadioButton name="test1">Test 1</RadioButton>
      <RadioButton name="test2">Test 2</RadioButton>
      <RadioButton name="test3">Test 3</RadioButton>
    </RadioButtonGroup>
  ))
  .add('With Action', () => (
    <RadioButtonGroup
      name="test"
      defaultSelected="test2"
      label="Test"
      onChange={action('Changed selected button')}
    >
      <RadioButton name="test1">Test 1</RadioButton>
      <RadioButton name="test2">Test 2</RadioButton>
      <RadioButton name="test3">Test 3</RadioButton>
    </RadioButtonGroup>
  ));

