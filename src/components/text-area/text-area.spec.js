import React from 'react';
import test from 'ava';
import is from 'is_js';

import { mount } from '../../../tests/helpers/enzyme';

import TextArea from './text-area';

const props = {
  value: '',
  onChange: () => {},
  label: '',
};

test('should render a textarea component', (t) => {
  const wrapper = mount(<TextArea {...props} />);

  t.deepEqual(wrapper.find('textarea').length, 1);
});

test('should render a label with a random generated id', (t) => {
  const wrapper = mount(<TextArea {...props} />);
  const label = wrapper.find('Label');

  t.deepEqual(label.length, 1);
  t.true(is.string(label.prop('id')));
});
