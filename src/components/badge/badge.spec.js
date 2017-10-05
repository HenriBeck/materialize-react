import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Badge from './badge';

test('should a span with a class of badge', (t) => {
  const wrapper = mount(<Badge>1</Badge>);

  t.deepEqual(wrapper.find('span.badge').length, 1);
});
