import test from 'ava';
import React from 'react';
import is from 'is_js';

import { shallow } from '../../../tests/helpers/enzyme';
import connectWithTheme from './connect-with-theme';

test('should return a function', (t) => {
  t.true(is.function(connectWithTheme({})));
});

test('should render the passed in component', (t) => {
  const WrappedComponent = connectWithTheme('div');
  const wrapper = shallow(<WrappedComponent/>);

  t.deepEqual(wrapper.find('div').length, 1);

  t.true(Boolean(wrapper.context('theme')));
});
