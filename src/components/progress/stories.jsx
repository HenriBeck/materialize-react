import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  number,
  boolean,
} from '@storybook/addon-knobs';

import Progress from './progress';

const style = { width: 400 };

storiesOf('Progress', module)
  .addDecorator(withKnobs)
  .add('Default Styles', () => (
    <div style={style}>
      <Progress
        progress={number('Progress', 75, {
          range: true,
          min: 0,
          max: 100,
          step: 1,
        })}
      />
    </div>
  ))
  .add('Indeterminate Style', () => (
    <div style={style}>
      <Progress
        indeterminate
        active={boolean('Active', true)}
      />
    </div>
  ));
