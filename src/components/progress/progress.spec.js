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
  const root = wrapper.find('[role="progressbar"]');

  t.deepEqual(root.prop('aria-valuemin'), '0');
  t.deepEqual(root.prop('aria-valuenow'), 40);
  t.deepEqual(root.prop('aria-valuemax'), '100');
});

test('should have a class when the progress is indeterminate and active', (t) => {
  const wrapper = mount(
    <Progress
      indeterminate
      active
    />,
  );

  t.deepEqual(wrapper.find('.progress--bar-indeterminate-active').length, 1);
});

test('should throw an error if the indeterminate prop is changed', (t) => {
  const wrapper = mount(<Progress progress={40} />);

  t.throws(() => wrapper.setProps({ indeterminate: true }));
});
