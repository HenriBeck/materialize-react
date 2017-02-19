import test from 'ava';
import React from 'react';

import Progress from './progress.jsx';
import {
  shallow,
  mount,
} from 'tests/enzyme';

test('should have a root node with the role of progressbar', (t) => {
  const wrapper = shallow(<Progress />);

  // Check if we have a element with the role of progressbar
  t.deepEqual(wrapper.find({ role: 'progressbar' }).length, 1);
});

test('should have aria-valuemin and aria-valuemax on the root node', (t) => {
  const wrapper = shallow(<Progress mode="normal" />);
  const root = wrapper.find({ role: 'progressbar' });

  // Check if the valuemin and valuemax props are set
  t.deepEqual(root.prop('aria-valuemin'), 0);
  t.deepEqual(root.prop('aria-valuemax'), 100);
});

test('should have aria-disabled on the root node when the progress bar is disabled', (t) => {
  const wrapper = shallow(<Progress disabled />);
  const root = wrapper.find({ role: 'progressbar' });

  t.deepEqual(root.prop('aria-disabled'), true);
});

test('should set the aria-valuenow to the value of the progress prop', (t) => {
  const wrapper = mount(<Progress progress={40} />);
  const root = wrapper.find({ role: 'progressbar' });

  t.deepEqual(root.prop('aria-valuenow'), 40);
});

test('should change the aria-valuenow when the progress prop changes', (t) => {
  const wrapper = mount(<Progress progress={40} />);

  wrapper.setProps({ progress: 80 });

  const root = wrapper.find({ role: 'progressbar' });

  t.deepEqual(root.prop('aria-valuenow'), 80);
});

test('should have two children when the mode is set to indeterminate', (t) => {
  const wrapper = mount(<Progress mode="indeterminate" />);

  t.deepEqual(wrapper.find({ role: 'progressbar' }).children().length, 2);
});

test('should animate the bar in if the active state changes to true', (t) => {
  const wrapper = mount(
    <Progress
      active
      mode="indeterminate"
    />,
  );
  const bar = wrapper
    .find({ role: 'progressbar' })
    .children()
    .find('span')
    .first();

  wrapper.setProps({ active: false });

  t.deepEqual(bar.node.style.opacity, '0');

  wrapper.setProps({ active: true });

  t.deepEqual(bar.node.style.opacity, '1');
});

test('should not start the animations on mount if the progress isn\'t active', (t) => {
  const wrapper = mount(<Progress mode="indeterminate" />);
  const instance = wrapper.instance();

  t.deepEqual(instance.barAnimation, null);
  t.deepEqual(instance.indeterminateAnimation, null);

  wrapper.setProps({ active: true });

  t.notDeepEqual(instance.barAnimation, null);
  t.notDeepEqual(instance.indeterminateAnimation, null);
});

