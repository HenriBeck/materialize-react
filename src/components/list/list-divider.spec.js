import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import ListDivider from './list-divider';

test('should render a li and a Divider inside', (t) => {
  const wrapper = mount(<ListDivider />);
  const li = wrapper.find('li');

  t.deepEqual(li.length, 1);
  t.deepEqual(li.find('Divider').length, 1);
});

test('should add a class of list--divider-inset when the inset prop is passed', (t) => {
  const wrapper = mount(<ListDivider inset />);
  const li = wrapper.find('li');

  t.deepEqual(li.prop('className').includes('list--divider-inset'), true);
});
