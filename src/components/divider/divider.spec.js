import test from 'ava';
import React from 'react';

import Divider from './divider';
import { mount } from '../../../tests/helpers/enzyme';

test('should render the a div', (t) => {
  const wrapper = mount(<Divider />);

  t.deepEqual(wrapper.find('Jss(Divider)').length, 1);
  t.deepEqual(wrapper.find('div.divider').length, 1);
});
