import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Prefix from './prefix';

const createRef = () => true;

test('should render a span with the class prefix', (t) => {
  const wrapper = mount(
    <Prefix
      disabled
      createRef={createRef}
    >
      Test
    </Prefix>,
  );

  t.deepEqual(wrapper.find('span.prefix').length, 1);
});
