import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  text,
  boolean,
} from '@storybook/addon-knobs';

import Switch from './switch-container';

storiesOf('Switch', module)
  .add('Default Styles', () => (
    <Switch name="test" />
  ))
  .add('Default Toggled', () => (
    <Switch
      defaultToggled
      name="test"
    />
  ))
  .add('Disabled', () => (
    <Switch
      disabled
      name="test"
    />
  ))
  .add('Label right', () => (
    <Switch name="test">Label</Switch>
  ))
  .add('Label left', () => (
    <Switch
      labelPosition="left"
      name="test"
    >
      Label
    </Switch>
  ))
  .add('Interactive', () => (
    <Switch
      disabled={boolean('Disabled', false)}
      name="test"
    >
      {text('Label', 'Label')}
    </Switch>
  ));
