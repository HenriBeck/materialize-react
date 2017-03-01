import React from 'react';
import {
  storiesOf,
  action,
} from '@kadira/storybook';

import Chip from './chip.jsx';

storiesOf('Chip', module)
  .add('Default styles', () => (
    <Chip id="test">Hello</Chip>
  ))
  .add('With image as text and color', () => (
    <Chip
      id="test"
      img={{
        color: 'blue',
        text: 'ab',
      }}
    >
      Hello
    </Chip>
  ))
  .add('With image', () => (
    <Chip
      id="test"
      img="http://cdn.edgecast.steamstatic.com/steamcommunity/public/images/avatars/9d/9d052b9dd92d1bcad5741c32c0029b3ed5128f67_full.jpg"
    >
      Hello
    </Chip>
  ))
  .add('With delete option', () => (
    <Chip
      deletable
      id="test"
      onDelete={action('Delete')}
    >
      Hello
    </Chip>
  ))
  .add('With delete option', () => (
    <Chip
      deletable
      id="test"
      img={{
        color: 'blue',
        text: 'ab',
      }}
      onDelete={action('Delete')}
    >
      Hello
    </Chip>
  ));
