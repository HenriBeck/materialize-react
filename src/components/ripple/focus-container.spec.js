import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';
import FocusContainer from './focus-container';

const defaultProps = {
  isFocused: false,
  classes: { focus: '' },
  round: false,
  opacity: 0.2,
  color: '',
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

test('should animate the background color when the prop changes and the element has focus', (t) => {
  const wrapper = mount(
    <FocusContainer
      {...defaultProps}
      isFocused
    />,
  );
  const span = wrapper.find('span').first();

  wrapper.setProps({ color: 'black' });

  t.deepEqual(span.node.style.backgroundColor, 'black');

  wrapper.setProps({ isFocused: false });
  wrapper.setProps({ color: 'white' });

  t.deepEqual(span.node.style.backgroundColor, 'black');
});

test('should not change the bg when the element isn\'t focused', (t) => {
  const wrapper = mount(<FocusContainer {...defaultProps} />);
  const span = wrapper.find('span').first();
  const bgColor = span.node.style.backgroundColor;

  wrapper.setProps({ color: 'black' });

  t.deepEqual(span.node.style.backgroundColor, bgColor);
});
