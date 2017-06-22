import React from 'react';
import { storiesOf } from '@storybook/react';

import Switch from './switch-container';

storiesOf('Switch', module)
  .add('Default Styles', () => (
    <Switch name="test" />
  ));
