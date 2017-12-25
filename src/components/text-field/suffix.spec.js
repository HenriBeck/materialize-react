import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Suffix from './suffix';

test('should render a span with the class suffix', (t) => {
  const wrapper = mount(<Suffix disabled>Test</Suffix>);

  t.deepEqual(wrapper.find('span.suffix').length, 1);
});
