import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Tab from './tab';

const props = {
  name: 'test',
  tabStyle: 'text-and-icons',
  createRef: () => {},
  selected: true,
  focused: false,
};

test('should render a Jss HoC and the Tab component', (t) => {
  const wrapper = mount(<Tab {...props}>Children</Tab>);

  t.deepEqual(wrapper.find('Jss(Tab)').length, 1);
  t.deepEqual(wrapper.find('span[role="tab"]').length, 1);
});

test('should apply the tab--focused class when the focused prop is passed', (t) => {
  const wrapper = mount(
    <Tab
      {...props}
      focused
    >
      Children
    </Tab>,
  );

  t.deepEqual(wrapper.find('span.tab--focused').length, 1);
});

