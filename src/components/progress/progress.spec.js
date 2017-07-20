import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import ProgressWrapper, { Progress } from './progress';
import { mount } from '../../../tests/helpers/enzyme';

const defaultProps = {
  classes: { progress: 'progress' },
  theme: { progress: {} },
};

test('should have a root node with the role of progressbar', (t) => {
  const wrapper = mount(<ProgressWrapper />);

  // Check if we render a JSS HoC
  t.deepEqual(wrapper.find('Jss(Progress)').length, 1);
});

test('should have aria-valuemin and aria-valuemax on the root node', (t) => {
  const wrapper = shallow(<Progress {...defaultProps} />);
  const root = wrapper.find('.progress');

  // Check if the valuemin and valuemax props are set
  t.deepEqual(root.prop('aria-valuemin'), 0);
  t.deepEqual(root.prop('aria-valuemax'), 100);
});

test('should set the aria-valuenow to the value of the progress prop', (t) => {
  const wrapper = shallow(
    <Progress
      progress={40}
      {...defaultProps}
    />,
  );
  const root = wrapper.find('.progress');

  t.deepEqual(root.prop('aria-valuenow'), 40);
});

test('should change the aria-valuenow when the progress prop changes', (t) => {
  const wrapper = shallow(
    <Progress
      progress={40}
      {...defaultProps}
    />,
  );

  wrapper.setProps({ progress: 100 });

  const root = wrapper.find('.progress');

  // Check if the aria-valuenow prop has changed
  t.deepEqual(root.prop('aria-valuenow'), 100);
});

test('should animate the secondary progress bar', (t) => {
  const wrapper = shallow(
    <Progress
      secondaryProgress={40}
      {...defaultProps}
    />,
  );

  wrapper.setProps({ secondaryProgress: 80 });

  // There is no way of exactly checking if the secondary progress has been animated
  t.pass();
});

test('should add the indeterminate class', (t) => {
  const wrapper = shallow(
    <Progress
      indeterminate
      active
      {...defaultProps}
    />,
  );
  const elem = wrapper.find('.progress');

  // Check if the correct class has been applied
  t.true(elem.prop('className').includes('progress--indeterminate'));

  // Check if the element got updated
  t.true(elem.prop('data-active'));
});

test('should have aria-disabled set to true', (t) => {
  const wrapper = shallow(
    <Progress
      disabled
      {...defaultProps}
    />,
  );
  const root = wrapper.find('.progress');

  // Check if the aria-disabled props is set
  t.deepEqual(root.prop('aria-disabled'), true);
});
