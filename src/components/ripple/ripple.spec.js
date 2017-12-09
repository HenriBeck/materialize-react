import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';

import Ripple from './ripple';

test('should render a Jss HoC and a span with the ripple class', (t) => {
  const wrapper = mount(<Ripple />);

  t.deepEqual(wrapper.find('Jss(Ripple)').length, 1);
  t.deepEqual(wrapper.find('span.ripple').length, 1);
});

test('should add a centered wave when the ripple is pressed', (t) => {
  const wrapper = mount(<Ripple center />);

  wrapper
    .find('.ripple')
    .simulate('touchStart', {
      type: 'touchstart',
      x: 0,
      y: 0,
    });

  t.deepEqual(wrapper.find('Wave').length, 1);
});

test('should not add a wave when the right mouse button is pressed', (t) => {
  const wrapper = mount(<Ripple />);

  wrapper
    .find('.ripple')
    .simulate('mouseDown', {
      type: 'mousedown',
      button: 2,
    });

  t.deepEqual(wrapper.find('Wave').length, 0);
});

test('should not add a wave when a mouse down event is emitted after a touch event', (t) => {
  const wrapper = mount(<Ripple />);

  wrapper
    .find('.ripple')
    .simulate('touchStart', {
      type: 'touchstart',
      x: 0,
      y: 0,
    });

  wrapper
    .find('.ripple')
    .simulate('mouseDown', {
      type: 'mousedown',
      button: 0,
    });

  t.deepEqual(wrapper.find('Wave').length, 1);
});

test('should update the state when the mouse up event get\'s fired', (t) => {
  const wrapper = mount(<Ripple />);

  wrapper
    .find('.ripple')
    .simulate('mouseDown', {
      type: 'mousedown',
      x: 0,
      y: 0,
      button: 0,
    });

  wrapper
    .find('.ripple')
    .simulate('mouseUp', {});

  t.deepEqual(
    wrapper
      .find('Wave')
      .prop('animatingOut'),
    true,
  );
});

test('should remove a wave when the onFinish prop of a wave get\'s called', (t) => {
  const wrapper = mount(<Ripple />);

  wrapper
    .find('.ripple')
    .simulate('mouseDown', {
      type: 'mousedown',
      x: 0,
      y: 0,
      button: 0,
    });

  wrapper
    .find('span.ripple--wave')
    .simulate('transitionEnd');

  t.deepEqual(wrapper.find('Wave').length, 0);
});

test('should have the focusOpacity when the isFocused prop is passed', (t) => {
  const wrapper = mount(<Ripple isFocused />);

  t.deepEqual(
    wrapper
      .find('.ripple--focus')
      .prop('style')
      .opacity,
    0.2,
  );
});
