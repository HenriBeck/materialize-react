import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Badge from './badge';

test('should render a div with a span and a class name of badge inside', (t) => {
  const wrapper = mount(<Badge badgeContent={1}>Hello</Badge>);
  const div = wrapper.find('div');

  t.deepEqual(div.length, 1);
  t.deepEqual(div.find('span.badge').length, 1);
});
