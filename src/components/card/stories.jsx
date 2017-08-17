import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from './card';
import Button from '../button';

const avatar = (
  <span style={{ backgroundColor: 'red' }}>
    HB
  </span>
);

storiesOf('Card', module)
  .add('Default', () => (
    <Card>
      <Card.Header
        avatar={avatar}
        subtitle="Subtitle"
      >
        Title
      </Card.Header>

      <Card.Actions stacked>
        <Button>Test</Button>
        <Button>Test</Button>
      </Card.Actions>
    </Card>
  ));
