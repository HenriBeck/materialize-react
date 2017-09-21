import React from 'react';
import { storiesOf } from '@storybook/react';

import Slider from './slider';

const style = { width: 260 };

storiesOf('Slider', module)
  .add('Default Styles', () => (
    <div style={style}>
      <Slider />
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
