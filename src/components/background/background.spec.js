import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Background from './index';

test('should render a div and a JSS HoC Component', (t) => {
  const wrapper = mount(<Background>Hello</Background>);

  t.deepEqual(wrapper.find('Jss(Background)').length, 1);
  t.deepEqual(wrapper.find('div').length, 1);
});
