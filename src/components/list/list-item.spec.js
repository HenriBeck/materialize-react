import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';

import ListItem from './list-item';

test('should render a li with the class of list--item', (t) => {
  const wrapper = shallow(<ListItem inset={false}>Hello</ListItem>).dive();
  const li = wrapper.find('li');

  t.deepEqual(li.length, 1);
  t.deepEqual(li.prop('className').includes('list--item'), true);
});

test('should render a span as the left item when the inset prop is passed', (t) => {
  const wrapper = shallow(<ListItem inset>Hello</ListItem>).dive();

  t.deepEqual(wrapper.find('span.list--item-left-item').length, 1);
});

test('should render a span as the right item when the right item prop is passed', (t) => {
  const wrapper = shallow(
    <ListItem
      inset={false}
      rightItem="Right item"
    >
      Hello
    </ListItem>,
  ).dive();

  t.deepEqual(wrapper.find('span.list--item-right-item').length, 1);
});

test('should render the secondary content inside the content when the prop is passed', (t) => {
  const wrapper = shallow(
    <ListItem
      inset={false}
      secondaryContent="Secondary"
    >
      Hello
    </ListItem>,
  ).dive();

  t.deepEqual(
    wrapper
      .find('.list--item-content')
      .find('.list--item-secondary-content')
      .length,
    1,
  );
});
