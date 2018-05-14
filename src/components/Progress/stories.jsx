// @flow strict-local

import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  number,
  boolean,
} from '@storybook/addon-knobs';

import Progress from '.';

const style = { width: 400 };

storiesOf('Progress & Activity', module)
  .add('Progress', () => (
    <div style={style}>
      <Progress
        indeterminate={boolean('Indeterminate', false)}
        active={boolean('Active', true)}
        progress={number('Progress', 75, {
          range: true,
          min: 0,
          max: 100,
          step: 1,
        })}
      />
    </div>
  ));
