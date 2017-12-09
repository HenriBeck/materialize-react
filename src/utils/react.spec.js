import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';

import { cloneChildrenWithClassName } from './react';

test('should clone the children and merge the className prop', (t) => {
  const children = cloneChildrenWithClassName([
    <div
      key="test1"
      className="some-classname"
    />,
    <div key="test2" />,
  ], { className: 'test' });

  const wrapper = mount(
    <span>
      {children}
    </span>,
  );

  t.deepEqual(wrapper.find('.some-classname').length, 1);
  t.deepEqual(wrapper.find('.test').length, 2);
});
