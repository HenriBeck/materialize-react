import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from './card';
import Button from '../button';
import { blue500 } from '../../styles/colors';

const avatar = (
  <span style={{ backgroundColor: blue500 }}>
    HB
  </span>
);

storiesOf('Card', module)
  .add('Title with content', () => (
    <Card>
      <Card.Header>Title</Card.Header>

      <Card.Content>
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
      </Card.Content>
    </Card>
  ))
  .add('Title with subtitle and content', () => (
    <Card>
      <Card.Header subtitle="Subtitle">Title</Card.Header>

      <Card.Content>
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
      </Card.Content>
    </Card>
  ))
  .add('Title with avatar and content', () => (
    <Card>
      <Card.Header avatar={avatar}>Title</Card.Header>

      <Card.Content>
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
      </Card.Content>
    </Card>
  ))
  .add('Title with avatar and subtitle and content', () => (
    <Card>
      <Card.Header
        avatar={avatar}
        subtitle="subtitle"
      >
        Title
      </Card.Header>

      <Card.Content>
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
      </Card.Content>
    </Card>
  ))
  .add('Title with content and actions', () => (
    <Card>
      <Card.Header>Title</Card.Header>

      <Card.Content>
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
      </Card.Content>

      <Card.Actions>
        <Button>Action 1</Button>

        <Button>Action 2</Button>
      </Card.Actions>
    </Card>
  ))
  .add('Title with content and actions stacked', () => (
    <Card>
      <Card.Header>Title</Card.Header>

      <Card.Content>
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
      </Card.Content>

      <Card.Actions stacked>
        <Button>Action 1</Button>

        <Button>Action 2</Button>
      </Card.Actions>
    </Card>
  ))
  .add('Image with title and content', () => (
    <Card>
      <Card.Media url="http://placehold.it/400x250" />

      <Card.Header subtitle="subtitle">Title</Card.Header>

      <Card.Content>
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
      </Card.Content>
    </Card>
  ))
  .add('Title with image and action', () => (
    <Card>
      <Card.Header>Title</Card.Header>

      <Card.Media url="http://placehold.it/400x250" />

      <Card.Content>
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
        Lorem ipsum dolor, Lorem ipsum dolor
      </Card.Content>
    </Card>
  ));
