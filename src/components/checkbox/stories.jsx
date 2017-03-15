import React from 'react';
import {
  storiesOf,
  action,
} from '@kadira/storybook';

import Checkbox from './checkbox-container';

storiesOf('Checkbox', module)
  .add('Default styles', () => (
    <Checkbox name="name" />
  ))
  .add('Default Checked', () => (
    <Checkbox
      defaultChecked
      name="name"
    />
  ))
  .add('Right Label', () => (
    <Checkbox name="name">Right Label</Checkbox>
  ))
  .add('Left Label', () => (
    <Checkbox
      labelPosition="left"
      name="name"
    >
      Left Label
    </Checkbox>
  ))
  .add('Disabled', () => (
    <Checkbox
      disabled
      name="name"
    >
      Right Label
    </Checkbox>
  ))
  .add('Disabled and Checked', () => (
    <Checkbox
      disabled
      defaultChecked
      name="name"
    >
      Right Label
    </Checkbox>
  ))
  .add('With callback', () => (
    <Checkbox
      name="name"
      onChange={action('Toggled')}
    >
      Right Label
    </Checkbox>
  ));
