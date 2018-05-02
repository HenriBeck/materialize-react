// @flow strict

import React from 'react';
import { storiesOf } from '@storybook/react';
import noop from 'lodash.noop';

import Button from '../Button';
import { getColor } from '../../styles/colors';
import Avatar from '../Avatar';

import Card from '.';

const style = { maxWidth: 300 };

const avatar = (
  <Avatar
    type="name"
    bgColor={getColor('indigo', '500')}
  >
    HB
  </Avatar>
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
    <Card style={style}>
      <Card.Header>Title</Card.Header>

      {content}
    </Card>
  ))
  .add('Title with subtitle and content', () => (
    <Card style={style}>
      <Card.Header subtitle="Subtitle">Title</Card.Header>

      {content}
    </Card>
  ))
  .add('Title with avatar and content', () => (
    <Card style={style}>
      <Card.Header avatar={avatar}>Title</Card.Header>

      {content}
    </Card>
  ))
  .add('Title with avatar and subtitle and content', () => (
    <Card style={style}>
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
    <Card style={style}>
      <Card.Header>Title</Card.Header>

      {content}

      <Card.Actions>
        <Button onPress={noop}>Action 1</Button>
        <Button onPress={noop}>Action 2</Button>
      </Card.Actions>
    </Card>
  ))
  .add('Title with content and actions stacked', () => (
    <Card style={style}>
      <Card.Header>Title</Card.Header>

      {content}

      <Card.Actions stacked>
        <Button onPress={noop}>Action 1</Button>
        <Button onPress={noop}>Action 2</Button>
      </Card.Actions>
    </Card>
  ))
  .add('Image with title and content', () => (
    <Card style={style}>
      <Card.Media url="http://placehold.it/400x250" />

      <Card.Header subtitle="subtitle">Title</Card.Header>

      {content}
    </Card>
  ))
  .add('Title with image and action', () => (
    <Card style={style}>
      <Card.Header>Title</Card.Header>

      <Card.Media url="http://placehold.it/400x250" />

      {content}
    </Card>
  ));
