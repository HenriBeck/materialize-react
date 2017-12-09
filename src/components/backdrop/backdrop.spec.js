import test from 'ava';
import React from 'react';

import { mount } from '../../../tests/helpers/enzyme';

import Backdrop from './backdrop';

test('should render a div with the class of backdrop', (t) => {
  const wrapper = mount(<Backdrop />);

  t.deepEqual(wrapper.find('span.backdrop').length, 1);
});

test('should add a class of backdrop--active when the active prop is passed', (t) => {
  const wrapper = mount(<Backdrop active />);

  t.deepEqual(wrapper.find('.backdrop--active').length, 1);
});
