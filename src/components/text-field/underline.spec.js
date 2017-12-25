import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Underline from './underline';

test('should render a span element', (t) => {
  const wrapper = mount(
    <Underline
      isFocused={false}
      disabled={false}
      hasError={false}
    />,
  );

  t.deepEqual(wrapper.find('span').length, 1);
});

test('should add the class underlineActive when the isFocused prop is passed', (t) => {
  const wrapper = mount(
    <Underline
      isFocused
      disabled={false}
      hasError={false}
    />,
  );

  t.deepEqual(wrapper.find('.underlineActive').length, 1);
});

test('should add the class underlineActive when the hasError prop is passed', (t) => {
  const wrapper = mount(
    <Underline
      hasError
      isFocused={false}
      disabled={false}
    />,
  );

  t.deepEqual(wrapper.find('.underlineActive').length, 1);
});
