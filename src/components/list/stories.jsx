import React from 'react';
import { storiesOf } from '@storybook/react';

import Icon from '../icon';
import Ripple from '../ripple';

import List from './list';

const styles = { minWidth: 250 };

storiesOf('List', module)
  .add('Default List', () => (
    <List style={styles}>
      <List.Item>List item 1</List.Item>
      <List.Item>List item 2</List.Item>
      <List.Item>List item 3</List.Item>
      <List.Item>List item 4</List.Item>
      <List.Item>List item 5</List.Item>
    </List>
  ))
  .add('List with subheader', () => (
    <List style={styles}>
      <List.Subheader>Subheader</List.Subheader>
      <List.Item>List item 1</List.Item>
      <List.Item>List item 2</List.Item>
      <List.Item>List item 3</List.Item>
      <List.Item>List item 4</List.Item>
      <List.Item>List item 5</List.Item>
    </List>
  ))
  .add('List with subheader and divider', () => (
    <List style={styles}>
      <List.Subheader>Subheader 1</List.Subheader>
      <List.Item>List item 1</List.Item>
      <List.Item>List item 2</List.Item>
      <List.Divider />
      <List.Subheader>Subheader 2</List.Subheader>
      <List.Item>List item 3</List.Item>
      <List.Item>List item 4</List.Item>
      <List.Item>List item 5</List.Item>
    </List>
  ))
  .add('Inset List with subheader', () => (
    <List
      inset
      style={styles}
    >
      <List.Subheader>Subheader 1</List.Subheader>
      <List.Item>List item 1</List.Item>
      <List.Item>List item 2</List.Item>
      <List.Item>List item 3</List.Item>
      <List.Item>List item 4</List.Item>
      <List.Item>List item 5</List.Item>
    </List>
  ))
  .add('Inset list with left icon', () => (
    <List
      inset
      style={styles}
    >
      <List.Subheader>Subheader 1</List.Subheader>
      <List.Item leftItem={<Icon icon="settings" />}>List item 1</List.Item>
      <List.Item leftItem={<Icon icon="settings" />}>List item 2</List.Item>
      <List.Item leftItem={<Icon icon="settings" />}>List item 3</List.Item>
      <List.Item leftItem={<Icon icon="settings" />}>List item 4</List.Item>
      <List.Item leftItem={<Icon icon="settings" />}>List item 5</List.Item>
    </List>
  ))
  .add('Inset list with left icon and inset subheader', () => (
    <List
      inset
      style={styles}
    >
      <List.Subheader inset>Subheader 1</List.Subheader>
      <List.Item leftItem={<Icon icon="settings" />}>List item 1</List.Item>
      <List.Item leftItem={<Icon icon="settings" />}>List item 2</List.Item>
      <List.Item leftItem={<Icon icon="settings" />}>List item 3</List.Item>
      <List.Item leftItem={<Icon icon="settings" />}>List item 4</List.Item>
      <List.Item leftItem={<Icon icon="settings" />}>List item 5</List.Item>
    </List>
  ))
  .add('List with ripple', () => (
    <List style={styles}>
      <List.Subheader>Subheader 1</List.Subheader>
      <List.Item>List item 1 <Ripple /></List.Item>
      <List.Item>List item 2 <Ripple /></List.Item>
      <List.Item>List item 3 <Ripple /></List.Item>
      <List.Item>List item 4 <Ripple /></List.Item>
      <List.Item>List item 5 <Ripple /></List.Item>
    </List>
  ))
  .add('List with avatar and right icon', () => (
    <List
      inset
      style={styles}
    >
      <List.Subheader>Subheader 1</List.Subheader>
      <List.Item
        leftItem={<List.Item.Avatar><Icon icon="account-circle" /></List.Item.Avatar>}
        rightItem={<Icon icon="information" />}
      >
        List item 1
      </List.Item>
      <List.Item
        leftItem={<List.Item.Avatar><Icon icon="account-circle" /></List.Item.Avatar>}
        rightItem={<Icon icon="information" />}
      >
        List item 2
      </List.Item>
      <List.Item
        leftItem={<List.Item.Avatar><Icon icon="account-circle" /></List.Item.Avatar>}
        rightItem={<Icon icon="information" />}
      >
        List item 3
      </List.Item>
    </List>
  ))
  .add('List with secondary content', () => (
    <List style={styles}>
      <List.Subheader>Subheader 1</List.Subheader>
      <List.Item secondaryContent="Secondary Content 1">List item 1 <Ripple /></List.Item>
      <List.Item secondaryContent="Secondary Content 2">List item 2 <Ripple /></List.Item>
      <List.Item secondaryContent="Secondary Content 3">List item 3 <Ripple /></List.Item>
      <List.Item secondaryContent="Secondary Content 4">List item 4 <Ripple /></List.Item>
      <List.Item secondaryContent="Secondary Content 5">List item 5 <Ripple /></List.Item>
    </List>
  ));
