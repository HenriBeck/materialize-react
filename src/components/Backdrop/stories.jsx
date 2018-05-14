// @flow strict-local

import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Backdrop from '.';

storiesOf('App Elements', module)
  .add('Backdrop', () => (
    <Backdrop active={boolean('Active', false)} />
  ));
