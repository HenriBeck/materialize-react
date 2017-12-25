import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import HelperText from './helper-text';

test('should render a span element', (t) => {
  const wrapper = mount(
    <HelperText
      error=""
      helperText="Some helper text"
    />,
  );

  t.deepEqual(wrapper.find('span').length, 1);
});

test('should render the error string when it\'s passed', (t) => {
  const wrapper = mount(
    <HelperText
      error="Some error"
      helperText="Some helper text"
    />,
  );

  t.deepEqual(wrapper.find('span').text(), 'Some error');
});
