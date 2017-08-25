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

const content = (
  <Card.Content>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
    sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
    Stet clita kasd gubergren.
  </Card.Content>
);

storiesOf('Card', module)
  .add('Title with content', () => (
    <Card>
      <Card.Header>Title</Card.Header>

      {content}
    </Card>
  ))
  .add('Title with subtitle and content', () => (
    <Card>
      <Card.Header subtitle="Subtitle">Title</Card.Header>

      {content}
    </Card>
  ))
  .add('Title with avatar and content', () => (
    <Card>
      <Card.Header avatar={avatar}>Title</Card.Header>

      {content}
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

      {content}
    </Card>
  ))
  .add('Title with content and actions', () => (
    <Card>
      <Card.Header>Title</Card.Header>

      {content}

      <Card.Actions>
        <Button>Action 1</Button>
        <Button>Action 2</Button>
      </Card.Actions>
    </Card>
  ))
  .add('Title with content and actions stacked', () => (
    <Card>
      <Card.Header>Title</Card.Header>

      {content}

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

      {content}
    </Card>
  ))
  .add('Title with image and action', () => (
    <Card>
      <Card.Header>Title</Card.Header>

      <Card.Media url="http://placehold.it/400x250" />

      {content}
    </Card>
  ));
