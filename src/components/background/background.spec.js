import React from 'react';
import test from 'ava';

import Background from './background';
import { mount } from '../../../tests/helpers/enzyme';

test('should render a div and a JSS HOC Component', (t) => {
  const wrapper = mount(<Background>Hello</Background>);

  // Check if it renders a JSS HoC and a div
  t.deepEqual(wrapper.find('Jss(Background)').length, 1);
  t.deepEqual(wrapper.find('div').length, 1);
});
