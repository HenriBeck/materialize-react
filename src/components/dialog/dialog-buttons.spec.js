import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';
import DialogButtons from './dialog-buttons';

test('should render a div with the class of dialog--buttons', (t) => {
  const wrapper = mount(<DialogButtons>Hello</DialogButtons>);

  t.deepEqual(wrapper.find('div.dialog--buttons').length, 1);
});
