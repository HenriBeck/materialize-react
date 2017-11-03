import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';

import List from './list';

test('should render a ul', (t) => {
  const wrapper = mount(
    <List>
      <li>Hello</li>
    </List>,
  );

  t.deepEqual(wrapper.find('ul').length, 1);
});

test('should clone the list childs with the inset prop from the list container', (t) => {
  const wrapper = mount(
    <List inset>
      <List.Item>Hello</List.Item>
    </List>,
  );
  const listItem = wrapper.find('Jss(ListItem)').first();

  t.deepEqual(listItem.prop('inset'), true);
});
