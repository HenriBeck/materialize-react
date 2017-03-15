import React from 'react';
import { storiesOf } from '@kadira/storybook';
import {
  number,
  boolean,
} from '@kadira/storybook-addon-knobs';

import Progress from './progress';

const style = { width: 400 };

storiesOf('Progress', module)
  .add('Default Styles', () => (
    <Progress
      progress={number('Progress', 75, {
        min: 0,
        max: 100,
        step: 1,
      })}
      style={style}
    />
  ))
  .add('Indeterminate Style', () => (
    <Progress
      mode="indeterminate"
      active={boolean('Active', true)}
      style={style}
    />
  ));
