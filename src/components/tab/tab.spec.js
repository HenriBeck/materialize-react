import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';

import TabWrapper, { Tab } from './tab';
import { mount } from '../../../tests/helpers/enzyme';
import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

const props = {
  name: 'test',
  classes: createClassesFromStyles(Tab.styles),
  onPress: () => {},
  tabStyle: 'text-and-icons',
  createRef: () => {},
  selected: true,
  focused: false,
};

test('should render a Jss hoc and the Tab component', (t) => {
  const wrapper = mount(<TabWrapper {...props}>Children</TabWrapper>);

  t.deepEqual(wrapper.find('Jss(Tab)').length, 1);
});

test('should render an element with the role of tab', (t) => {
  const wrapper = shallow(<Tab {...props}>Children</Tab>);

  t.deepEqual(wrapper.find({ role: 'tab' }).length, 1);
});

test('should apply the tab--focused class when the focused prop is passed', (t) => {
  const wrapper = shallow(
    <Tab
      {...props}
      focused
    >
      Children
    </Tab>,
  );

  t.deepEqual(wrapper.find('.tab--focused').length, 1);
});

