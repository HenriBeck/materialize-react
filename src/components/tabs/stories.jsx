import React from 'react';
import { storiesOf } from '@storybook/react';

import Tabs from './tabs';
import Tab from '../tab';

storiesOf('Tabs', module)
  .add('Default styles', () => (
    <Tabs defaultSelected="test2">
      <Tab name="test1">Test 1</Tab>
      <Tab name="test2">Test 2</Tab>
      <Tab name="test3">Test 3</Tab>
    </Tabs>
  ));
