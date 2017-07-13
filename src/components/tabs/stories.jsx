import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Tabs from './tabs';
import Tab from '../tab';

storiesOf('Tabs', module)
  .add('Default styles', () => (
    <Tabs initialTab="test2">
      <Tab name="test1">Test 1</Tab>
      <Tab name="test2">Test 2</Tab>
      <Tab name="test3">Test 3</Tab>
    </Tabs>
  ))
  .add('Icon tabs with text', () => (
    <Tabs
      initialTab="test2"
      tabStyle="text-and-icons"
    >
      <Tab
        name="test1"
        icon="settings"
      >
        Test 1
      </Tab>

      <Tab
        name="test2"
        icon="bell"
      >
        Test 2
      </Tab>

      <Tab
        name="test3"
        icon="account"
      >
        Test 3
      </Tab>
    </Tabs>
  ))
  .add('Icon tabs', () => (
    <Tabs
      initialTab="test2"
      tabStyle="icons"
    >
      <Tab
        name="test1"
        icon="settings"
      />

      <Tab
        name="test2"
        icon="bell"
      />

      <Tab
        name="test3"
        icon="account"
      />
    </Tabs>
  ))
  .add('No Bar', () => (
    <Tabs
      initialTab="test2"
      noBar
    >
      <Tab name="test1">Test 1</Tab>
      <Tab name="test2">Test 2</Tab>
      <Tab name="test3">Test 3</Tab>
    </Tabs>
  ))
  .add('With onChange action', () => (
    <Tabs
      initialTab="test2"
      onChange={action('Tab changed')}
    >
      <Tab name="test1">Test 1</Tab>
      <Tab name="test2">Test 2</Tab>
      <Tab name="test3">Test 3</Tab>
    </Tabs>
  ));
