import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Ripple from './ripple.jsx';

storiesOf('Ripple', module)
  .addDecorator(story => (
    <div
      style={{
        position: 'relative',
        height: 200,
        width: 200,
        border: 'solid 1px white',
      }}
    >
      {story()}
    </div>
  ))
  .add('Default styles', () => (
    <Ripple />
  ))
  .add('Custom Color', () => (
    <Ripple color="red" />
  ))
  .add('Centered ripple', () => (
    <Ripple
      round
      center
    />
  ))
  .add('Custom Color via background', () => (
    <div
      style={{
        height: '100%',
        width: '100%',
        color: 'red',
      }}
    >
      <Ripple />
    </div>
  ));
