import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Fab from './fab';

test('should render a Fab button', (t) => {
  const wrapper = mount(<Fab icon="build" />);

  t.deepEqual(wrapper.find('Jss(Fab)').length, 1);
  t.deepEqual(wrapper.find('span[role="button"].fab').length, 1);
});

test('should warn against changing the mini prop', (t) => {
  const wrapper = mount(<Fab icon="build" />);

  t.throws(() => wrapper.setProps({ mini: true }));
});
