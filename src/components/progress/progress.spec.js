import test from 'ava';
import React from 'react';

import { mount } from '../../../tests/helpers/enzyme';

import Progress from './progress';

test('should have a root node with the role of progressbar', (t) => {
  const wrapper = mount(<Progress />);

  // Check if we render a JSS HoC
  t.deepEqual(wrapper.find('Jss(Progress)').length, 1);
  t.deepEqual(wrapper.find('.progress').length, 1);
});

test('should have aria-valuemin and aria-valuemax and aria-valuenow on the root node', (t) => {
  const wrapper = mount(<Progress progress={40} />);
  const root = wrapper.find('.progress');

  // Check if the valuemin and valuemax props are set
  t.deepEqual(root.prop('aria-valuemin'), 0);
  t.deepEqual(root.prop('aria-valuenow'), 40);
  t.deepEqual(root.prop('aria-valuemax'), 100);
});

test('should add the indeterminate class', (t) => {
  const wrapper = mount(<Progress indeterminate />);
  const elem = wrapper.find('.progress');

  // Check if the correct class has been applied
  t.true(elem.prop('className').includes('progress--indeterminate'));

  t.deepEqual(elem.prop('data-active'), false);

  wrapper.setProps({ active: true });

  // Check if the element got updated
  t.true(elem.prop('data-active'));
});

test('should have aria-disabled set to true', (t) => {
  const wrapper = mount(<Progress disabled />);
  const root = wrapper.find('.progress');

  // Check if the aria-disabled props is set
  t.deepEqual(root.prop('aria-disabled'), true);
});
