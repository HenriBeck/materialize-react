import React from 'react';
import test from 'ava';

import TabWrapper, { Tab } from './tab';
import { shallow } from '../../../tests/helpers/enzyme';

test('should render a Jss hoc and the Tab component', (t) => {
  const props = {
    onPress: () => {},
    tabStyle: 'text',
    createRef: () => {},
    selected: false,
    focused: false,
  };
  const wrapper = shallow(<TabWrapper {...props}>Children</TabWrapper>);
  const jssContainer = wrapper.find('Jss(Tab)');

  t.deepEqual(jssContainer.length, 1);
  t.deepEqual(jssContainer.dive().find('Tab').length, 1);
});

test('should render an event handler', (t) => {
  const props = {
    theme: {},
    classes: {},
    onPress: () => {},
    tabStyle: 'text-and-icons',
    createRef: () => {},
    selected: true,
    focused: false,
  };
  const wrapper = shallow(<Tab {...props}>Children</Tab>);

  t.deepEqual(wrapper.find('.tab--selected').length, 1);
});

