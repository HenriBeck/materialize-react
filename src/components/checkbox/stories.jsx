import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Checkbox from './checkbox-container';

storiesOf('Checkbox', module)
  .add('Default styles', () => (
    <Checkbox name="name">Label</Checkbox>
  ))
  .add('Default Checked', () => (
    <Checkbox
      defaultChecked
      name="name"
    >
      Label
    </Checkbox>
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
