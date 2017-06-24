import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';
import FocusContainer from './focus-container';

const defaultProps = {
  isFocused: false,
  classes: { focus: '' },
  round: false,
  opacity: 0.2,
};

test('should render a span', (t) => {
  const wrapper = mount(<FocusContainer {...defaultProps} />);

  t.deepEqual(wrapper.find('span').length, 1);
});

test('should add focus if the initial isFocused prop is true', (t) => {
  const wrapper = mount(
    <FocusContainer
      {...defaultProps}
      isFocused
    />,
  );
  const span = wrapper.find('span').first();

  t.deepEqual(span.node.style.opacity, '0.2');
});

test('should change focus when the isFocused prop is changed', (t) => {
  const wrapper = mount(<FocusContainer {...defaultProps} />);
  const span = wrapper.find('span').first();

  wrapper.setProps({ isFocused: true });

  t.deepEqual(span.node.style.opacity, '0.2');

  wrapper.setProps({ isFocused: false });

  t.deepEqual(span.node.style.opacity, '0');
});

test('should scale animation if the ripple is round', (t) => {
  const wrapper = mount(
    <FocusContainer
      {...defaultProps}
      round
    />,
  );
  const span = wrapper.find('span').first();

  wrapper.setProps({ isFocused: true });

  t.deepEqual(span.node.style.transform, 'scale(1)');

  wrapper.setProps({ isFocused: false });

  t.deepEqual(span.node.style.transform, 'scale(0)');
});

test('should not animate something if the isFocused prop hasn\'t changed', (t) => {
  const wrapper = mount(<FocusContainer {...defaultProps} />);
  const span = wrapper.find('span').first();
  const oldOpacity = span.node.style.opacity;

  wrapper.setProps({ round: true });

  t.deepEqual(span.node.style.opacity, oldOpacity);
});
