import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Divider from './divider';

storiesOf('Divider', module)
  .add('Default styles', () => (
    <Divider style={{ width: 400 }} />
  ));
