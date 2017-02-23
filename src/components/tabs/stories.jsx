import React from 'react';
import {
  storiesOf,
  action,
} from '@kadira/storybook';

import Tabs from './tabs.jsx';
import Tab from '../tab';

storiesOf('Tabs', module)
  .add('Default styles', () => (
    <Tabs initialTabId="button2">
      <Tab id="button1">Button 1</Tab>
      <Tab id="button2">Button 2</Tab>
      <Tab id="button3">Button 3 some really long text which will not be truncated yet</Tab>
    </Tabs>
  ))
  .add('With action on Tab change', () => (
    <Tabs
      initialTabId="button2"
      onTabChange={action('tabChange')}
    >
      <Tab id="button1">Button 1</Tab>
      <Tab id="button2">Button 2</Tab>
      <Tab id="button3">Button 3</Tab>
    </Tabs>
  ));
