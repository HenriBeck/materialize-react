import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';

import DialogHeader from './dialog-header';

test('should render a header with the class of dialog--header', (t) => {
  const wrapper = mount(<DialogHeader>Hello</DialogHeader>);

  t.deepEqual(wrapper.find('header.dialog--header').length, 1);
});
