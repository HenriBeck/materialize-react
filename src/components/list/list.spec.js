import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import List from './list';

test('should warn when no children are provided', (t) => {
  t.throws(() => mount(<List />));
});

test('should warn when no valid list child is being used', (t) => {
  t.throws(() => mount(<List><div /></List>));
});

test('should render a ul', (t) => {
  const wrapper = mount(
    <List>
      <List.Item>Hello</List.Item>
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
  const listItem = wrapper.find('ListItem').first();

  t.deepEqual(listItem.prop('inset'), true);
});

test('should not set the inset prop on a subheader', (t) => {
  const wrapper = mount(
    <List inset>
      <List.Subheader>Hello</List.Subheader>
    </List>,
  );
  const listItem = wrapper.find('ListSubheader').first();

  t.deepEqual(listItem.prop('inset'), false);
});
