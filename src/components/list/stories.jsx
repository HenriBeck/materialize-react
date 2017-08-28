import React from 'react';
import { storiesOf } from '@storybook/react';

import List from './list';

import Icon from '../icon';
import Ripple from '../ripple';

storiesOf('List', module)
  .add('Test', () => (
    <List inset>
      <List.Divider />
      <List.Subheader>Subheader</List.Subheader>
      <List.Item>Some Content</List.Item>

      <List.Item>
        Some Content
        <span className="list--item-content-secondary">Secondary content</span>
      </List.Item>

      <List.Item withRipple>
        Some Content with ripple
        <span className="list--item-content-secondary">Secondary content</span>
      </List.Item>

      <List.Item leftItem={<Icon icon="settings" />}>
        Some Content with left icon
        <span className="list--item-content-secondary">Secondary content</span>
      </List.Item>

      <List.Divider inset />

      <List.Item
        rightItem={<Icon icon="information" />}
        leftItem={<Icon icon="settings" />}
        secondaryContent="Secondary content"
      >
        <Ripple />

        Some Content with left icon
      </List.Item>
    </List>
  ));
