import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';
import Toolbar from './toolbar';

test('should render a Jss HoC and a div with the class of toolbar', (t) => {
  const wrapper = mount(<Toolbar>Hello</Toolbar>);

  t.deepEqual(wrapper.find('Jss(Toolbar)').length, 1);
  t.deepEqual(wrapper.find('div.toolbar').length, 1);
});
