import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from './card';
import Button from '../button';

storiesOf('Card', module)
  .add('Default', () => (
    <Card>
      Hello

      <Card.CardActions stacked>
        <Button>Test</Button>
        <Button>Test</Button>
      </Card.CardActions>
    </Card>
  ));
