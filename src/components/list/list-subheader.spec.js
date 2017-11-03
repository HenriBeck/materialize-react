import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Subheader from './subheader';

test('should render a li and have a class of list--subheader', (t) => {
  const wrapper = mount(<Subheader>Subheader</Subheader>);
  const li = wrapper.find('li');

  t.deepEqual(li.length, 1);
  t.deepEqual(li.prop('className').includes('list--subheader'), true);
});

test('should add the list--subheader-inset class when the inset prop is passed', (t) => {
  const wrapper = mount(<Subheader inset>Subheader</Subheader>);
  const li = wrapper.find('li');

  t.deepEqual(li.prop('className').includes('list--subheader-inset'), true);
});
