import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Slider from './slider-container';

const style = { width: 260 };

storiesOf('Slider', module)
  .add('Default Styles', () => (
    <div style={style}>
      <Slider onChange={action('Changed value')} />
    </div>
  ))
  .add('With min / max prop', () => (
    <div style={style}>
      <Slider
        min={0}
        max={256}
        onChange={action('Changed value')}
      />
    </div>
  ))
  .add('Disabled', () => (
    <div style={style}>
      <Slider
        disabled
        initialValue={40}
      />
    </div>
  ));
