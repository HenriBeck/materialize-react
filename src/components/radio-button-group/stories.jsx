import React from 'react';
import { storiesOf } from '@storybook/react';

import RadioButtonGroup from './radio-button-group';
import RadioButton from '../radio-button';

storiesOf('RadioButtonGroup', module)
  .add('Default styles', () => (
    <RadioButtonGroup
      defaultSelected="test2"
      label="Test"
    >
      <RadioButton name="test1">Test 1</RadioButton>
      <RadioButton name="test2">Test 2</RadioButton>
      <RadioButton name="test3">Test 3</RadioButton>
    </RadioButtonGroup>
  ));
