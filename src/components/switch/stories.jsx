import React from 'react';
import {
  storiesOf,
  action,
} from '@kadira/storybook';

import Switch from './switch.jsx';

storiesOf('Switch', module)
  .add('Default styles', () => (
    <Switch name="name" />
  ))
  .add('Default toggled', () => (
    <Switch
      defaultToggled
      name="name"
    />
  ))
  .add('Label right', () => (
    <Switch name="name">Right label</Switch>
  ))
  .add('Label left', () => (
    <Switch
      labelPosition="left"
      name="name"
    >
      Left label
    </Switch>
  ))
  .add('Disabled', () => (
    <Switch
      disabled
      name="name"
    >
      Right label
    </Switch>
  ))
  .add('Disabled and toggled', () => (
    <Switch
      disabled
      defaultToggled
      name="name"
    >
      Right label
    </Switch>
  ))
  .add('With callback', () => (
    <Switch
      name="name"
      onChange={action('Toggled!')}
    >
      Right label
    </Switch>
  ));
