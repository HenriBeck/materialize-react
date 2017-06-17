import React from 'react';
import { storiesOf } from '@storybook/react';

import Divider from './divider';

storiesOf('Divider', module)
  .add('Default styles', () => (
    <Divider style={{ width: 400 }} />
  ));
