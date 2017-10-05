import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Slider from './slider';

const props = {
  className: '',
  onTrackPress: () => {},
  onThumbPress: () => {},
  onThumbRelease: () => {},
  onTouchMove: () => {},
  onMouseMove: () => {},
  onKeyPress: () => {},
  onFocus: () => {},
  onBlur: () => {},
  isFocused: false,
  isDragging: false,
  value: 0,
  rootRef: () => {},
  translateX: 0,
  disabled: false,
  min: 0,
  max: 100,
};

test('should render a div', (t) => {
  const wrapper = mount(<Slider {...props} />, { themeType: 'dark' });

  t.deepEqual(wrapper.find('div.slider').length, 1);
});

test('should render two EventHandlers', (t) => {
  const wrapper = mount(<Slider {...props} />);

  t.deepEqual(wrapper.find('EventHandler').length, 2);
});

test('should scale the thumb up when the user is dragging it', (t) => {
  const wrapper = mount(
    <Slider
      {...props}
      isDragging
    />,
  );

  const thumbStyle = wrapper
    .find('EventHandler.slider--thumb')
    .prop('style');

  t.deepEqual(thumbStyle.transform.includes('scale(1.5)'), true);
});

test('should scale the thumb down when the slider is disabled', (t) => {
  const wrapper = mount(
    <Slider
      {...props}
      disabled
    />,
  );

  const thumbStyle = wrapper
    .find('EventHandler.slider--thumb')
    .prop('style');

  t.deepEqual(thumbStyle.transform.includes('scale(0.75)'), true);
});

test('should add a class of .slider--thumb-active when the value is greater than 0', (t) => {
  const wrapper = mount(
    <Slider
      {...props}
      value={40}
    />,
  );

  t.deepEqual(wrapper.find('span.slider--thumb-active').length, 1);
});

test('should add a class of .slider--thumb-focused when the slider is focused', (t) => {
  const wrapper = mount(
    <Slider
      {...props}
      isFocused
    />,
  );

  t.deepEqual(wrapper.find('span.slider--thumb-focused').length, 1);
});
