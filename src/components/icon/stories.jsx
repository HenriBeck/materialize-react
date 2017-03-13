import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Icon from './icon.jsx';

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
