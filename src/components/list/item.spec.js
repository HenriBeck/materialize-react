import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Item from './item';

test('should render a li with the class of list--item', (t) => {
  const wrapper = mount(<Item inset={false}>Hello</Item>);
  const li = wrapper.find('li');

  t.deepEqual(li.length, 1);
  t.deepEqual(li.prop('className').includes('list--item'), true);
});

test('should render a span as the left item when the inset prop is passed', (t) => {
  const wrapper = mount(<Item inset>Hello</Item>);

  t.deepEqual(wrapper.find('span.list--item-left-item').length, 1);
});

test('should render a span as the right item when the right item prop is passed', (t) => {
  const wrapper = mount(
    <Item
      inset={false}
      rightItem="Right item"
    >
      Hello
    </Item>,
  );

  t.deepEqual(wrapper.find('span.list--item-right-item').length, 1);
});

test('should render the secondary content inside the content when the prop is passed', (t) => {
  const wrapper = mount(
    <Item
      inset={false}
      secondaryContent="Secondary"
    >
      Hello
    </Item>,
  );

  t.deepEqual(
    wrapper
      .find('.list--item-content')
      .find('.list--item-secondary-content')
      .length,
    1,
  );
});
