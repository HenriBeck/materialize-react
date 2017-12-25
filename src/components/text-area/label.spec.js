import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Label from './label';

test('should render a label element', (t) => {
  const wrapper = mount(
    <Label
      hasError
      isFocused
      disabled
      hasValue
      id="id"
    >
      Label
    </Label>,
  );

  t.deepEqual(wrapper.find('label').length, 1);
});
