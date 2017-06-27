import test from 'ava';
import React from 'react';

import Progress from './progress';
import { mount } from '../../../tests/helpers/enzyme';

test('should have a root node with the role of progressbar', (t) => {
  const wrapper = mount(<Progress />);

  // Check if we render a JSS HoC
  t.deepEqual(wrapper.find('Jss(Progress)').length, 1);
});

test('should have aria-valuemin and aria-valuemax on the root node', (t) => {
  const wrapper = mount(<Progress />);
  const root = wrapper.find('.progress').first();

  // Check if the valuemin and valuemax props are set
  t.deepEqual(root.prop('aria-valuemin'), 0);
  t.deepEqual(root.prop('aria-valuemax'), 100);
});

test('should set the aria-valuenow to the value of the progress prop', (t) => {
  const wrapper = mount(<Progress progress={40} />);
  const root = wrapper.find('span.progress').first();

  t.deepEqual(root.prop('aria-valuenow'), 40);
});

test('should change the aria-valuenow when the progress prop changes', (t) => {
  const wrapper = mount(<Progress progress={40} />);
  const root = wrapper.find('span.progress').first();

  wrapper.setProps({ progress: 80 });

  // Check if the aria-valuenow prop has changed
  t.deepEqual(root.prop('aria-valuenow'), 80);
});

test('should animate the secondary progress bar', (t) => {
  const wrapper = mount(<Progress secondaryProgress={40} />);

  wrapper.setProps({ secondaryProgress: 80 });

  // There is no way of exactly checking if the secondary progress has been animated
  t.pass();
});

test('should add the indeterminate class', (t) => {
  const wrapper = mount(<Progress indeterminate />);

  // Check if the correct class has been applied
  t.deepEqual(wrapper.find('.progress--indeterminate').length, 1);

  // Start the progress animation
  wrapper.setProps({ active: true });

  // Check if the element got updated
  t.deepEqual(wrapper.find('.progress--indeterminate').prop('data-active'), true);
});

test('should have aria-disabled set to true', (t) => {
  const wrapper = mount(<Progress disabled />);
  const root = wrapper.find('.progress').first();

  // Check if the aria-disabled props is set
  t.deepEqual(root.prop('aria-disabled'), true);
});
