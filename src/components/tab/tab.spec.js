import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Tab from './tab';

const props = {
  name: 'test',
  onPress: () => {},
  tabStyle: 'text-and-icons',
  createRef: () => {},
  selected: true,
  focused: false,
};

test('should render a Jss hoc and the Tab component', (t) => {
  const wrapper = mount(<Tab {...props}>Children</Tab>);

  t.deepEqual(wrapper.find('Jss(Tab)').length, 1);
});

test('should render an element with the role of tab', (t) => {
  const wrapper = mount(<Tab {...props}>Children</Tab>);

  t.deepEqual(wrapper.find('div[role="tab"]').length, 1);
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

  t.deepEqual(wrapper.find('div.tab--focused').length, 1);
});

