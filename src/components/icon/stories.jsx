import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Icon from './icon.jsx';

storiesOf('Icon', module)
  .add('MDI Icon', () => (
    <Icon icon="chevron-down" />
  ))
  .add('Disabled Icon', () => (
    <Icon
      disabled
      icon="github-circle"
    />
  ))
  .add('Logo', () => (
    <Icon
      icon="logo"
      style={{ height: 100 }}
    />
  ))
  .add('Class Icons', () => (
    <div>
      <Icon icon="scout" />
      <Icon icon="soldier" />
      <Icon icon="pyro" />

      <Icon icon="demoman" />
      <Icon icon="heavy" />
      <Icon icon="engineer" />

      <Icon icon="medic" />
      <Icon icon="sniper" />
      <Icon icon="spy" />
    </div>
  ));
