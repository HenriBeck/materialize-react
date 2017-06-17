import React from 'react';
import { storiesOf } from '@storybook/react';
import Ripple from './ripple-container';

storiesOf('Ripple', module)
  .add('with text', () => (
    <Ripple />
  ));
