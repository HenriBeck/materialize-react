import React from 'react';
import { storiesOf } from '@storybook/react';

import Icon from './icon';

storiesOf('Icon', module)
  .add('MDI Icon', () => (
    <Icon icon="chevron-down" />
  ))
  .add('Disabled Icon', () => (
    <Icon
      disabled
      icon="github-circle"
    />
  ));
