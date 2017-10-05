import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';

import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

import { List } from './list';

const classes = createClassesFromStyles(List.styles);

test('should warn when no children are provided', (t) => {
  t.throws(() => shallow(<List classes={classes} />));
});

test('should warn when no valid list child is being used', (t) => {
  t.throws(() => shallow(<List classes={classes}><div /></List>));
});

test('should render a ul', (t) => {
  const wrapper = shallow(
    <List classes={classes}>
      <List.Item>Hello</List.Item>
    </List>,
  );

  t.deepEqual(wrapper.find('ul').length, 1);
});

test('should clone the list childs with the inset prop from the list container', (t) => {
  const wrapper = shallow(
    <List
      inset
      classes={classes}
    >
      <List.Item>Hello</List.Item>
    </List>,
  );
  const listItem = wrapper.find('Jss(Item)').first();

  t.deepEqual(listItem.prop('inset'), true);
});

test('should not set the inset prop on a subheader', (t) => {
  const wrapper = shallow(
    <List
      inset
      classes={classes}
    >
      <List.Subheader>Hello</List.Subheader>
    </List>,
  );
  const listItem = wrapper.find('Jss(Subheader)').first();

  t.deepEqual(listItem.prop('inset'), false);
});
