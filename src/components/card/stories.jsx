import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from './card';
import Button from '../button';

storiesOf('Card', module)
  .add('Default', () => (
    <Card>
      <Card.Content>
        Title
      </Card.Content>

      <Card.Actions stacked>
        <Button>Test</Button>
        <Button>Test</Button>
      </Card.Actions>
    </Card>
  ));
