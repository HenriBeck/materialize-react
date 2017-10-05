import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';

import ItemAvatar from './item-avatar';

test('should render a div with the class of list--item-avatar and the children inside', (t) => {
  const wrapper = mount(<ItemAvatar>Test</ItemAvatar>);
  const div = wrapper.find('div');

  t.deepEqual(div.length, 1);
  t.deepEqual(div.prop('className').includes('list--item-avatar'), true);
  t.deepEqual(div.text(), 'Test');
});
