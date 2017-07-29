import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';

import Animations from './animations';

test('should render a Jss HoC and the children', (t) => {
  const wrapper = mount(<Animations />);

  t.deepEqual(wrapper.find('Jss(Animations)').length, 1);
});
