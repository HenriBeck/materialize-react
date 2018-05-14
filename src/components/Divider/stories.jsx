// @flow strict-local

import React, { type Node } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Divider from '.';

storiesOf('Basic Elements', module)
  .add('Divider', (): Node => (
    <Divider vertical={boolean('Vertical', false)} />
  ));
