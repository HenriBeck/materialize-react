import test from 'ava';
import React from 'react';

import { mount } from '../../../tests/helpers/enzyme';

import Divider from './divider';

test('should render the a div', (t) => {
  const wrapper = mount(<Divider />);

  t.deepEqual(wrapper.find('Jss(Divider)').length, 1);
  t.deepEqual(wrapper.find('div.divider').length, 1);
});

test('should add a class of divider--vertical when the vertical prop is passed', (t) => {
  const wrapper = mount(<Divider vertical />);

  t.deepEqual(wrapper.find('.divider--vertical').length, 1);
});
