import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';
import DialogContent from './dialog-content';

test('should render a main with the class of dialog--content', (t) => {
  const wrapper = mount(<DialogContent>Hello</DialogContent>);

  t.deepEqual(wrapper.find('main.dialog--content').length, 1);
});
