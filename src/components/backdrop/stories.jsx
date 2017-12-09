import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Backdrop from './backdrop';

storiesOf('Backdrop', module)
  .add('Default styles', () => (
    <Backdrop active={boolean('Active', false)} />
  ));
