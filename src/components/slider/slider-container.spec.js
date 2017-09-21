import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import SliderContainer from './slider-container';

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
  translateX: '',
  disabled: false,
};

test('should render a div', (t) => {
  const wrapper = mount(<SliderContainer {...props} />);

  t.deepEqual(wrapper.find('div.slider').length, 1);
});

test('should render two EventHandlers', (t) => {
  const wrapper = mount(<SliderContainer {...props} />);

  t.deepEqual(wrapper.find('EventHandler').length, 2);
});

test('should scale the thumb up when the user is dragging it', (t) => {
  const wrapper = mount(
    <SliderContainer
      {...props}
      isDragging
    />,
  );

  const thumbStyle = wrapper
    .find('EventHandler')
    .last()
    .prop('style');

  t.deepEqual(thumbStyle.transform.includes('scale(1.5)'), true);
});

test('should scale the thumb down when the slider is disabled', (t) => {
  const wrapper = mount(
    <SliderContainer
      {...props}
      disabled
    />,
  );

  const thumbStyle = wrapper
    .find('EventHandler')
    .last()
    .prop('style');

  t.deepEqual(thumbStyle.transform.includes('scale(0.75)'), true);
});

test('should add a class of .slider--thumb-active when the value is greater than 0', (t) => {
  const wrapper = mount(
    <SliderContainer
      {...props}
      value={40}
    />,
  );

  const thumbclassName = wrapper
    .find('EventHandler')
    .last()
    .prop('className');

  t.deepEqual(thumbclassName.includes('slider--thumb-active'), true);
});
