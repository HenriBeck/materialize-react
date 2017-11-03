import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import SliderContainer from './slider-container';

const elem = {
  getBoundingClientRect() {
    return {
      left: 0,
      width: 100,
    };
  },
};
const options = { disableLifecycleMethods: true };

test('should render a SliderContainer', (t) => {
  const wrapper = shallow(<SliderContainer />, options);

  t.deepEqual(wrapper.find('Jss(Slider)').length, 1);
});

test('should get the current value by value property', (t) => {
  const wrapper = shallow(<SliderContainer />, options);
  const instance = wrapper.instance();

  t.deepEqual(instance.value, 0);
});

test('should set the current value by value property', (t) => {
  const wrapper = shallow(<SliderContainer />, options);
  const instance = wrapper.instance();

  instance.createRootRef(elem);

  instance.value = 40;

  t.deepEqual(wrapper.state('value'), 40);
  t.deepEqual(wrapper.state('translateX'), 40);
});

test('should set the translateX state on mount', (t) => {
  const wrapper = shallow(<SliderContainer initialValue={40} />, options);
  const instance = wrapper.instance();

  instance.createRootRef(elem);

  instance.componentDidMount();

  t.deepEqual(wrapper.state('translateX'), 40);
});

test('should change the isFocused state upon focus and blur', (t) => {
  const wrapper = shallow(<SliderContainer />, options);
  const instance = wrapper.instance();

  instance.handleFocus();

  t.deepEqual(wrapper.state('isFocused'), true);

  instance.handleBlur();

  t.deepEqual(wrapper.state('isFocused'), false);
});

test('should add event listeners upon thumb press and set the isDragging state to true', (t) => {
  const spy = sinon.spy(window, 'addEventListener');
  const wrapper = shallow(<SliderContainer />, options);
  const instance = wrapper.instance();

  instance.handleThumbPress();

  t.deepEqual(wrapper.state('isDragging'), true);
  t.deepEqual(spy.callCount, 4);

  window.addEventListener.restore();
});

test('should remove event listeners upon thumb release and reset the isDragging state', (t) => {
  const spy = sinon.spy(window, 'removeEventListener');
  const wrapper = shallow(<SliderContainer />, options);
  const instance = wrapper.instance();

  instance.handleThumbRelease();

  t.deepEqual(wrapper.state('isDragging'), false);
  t.deepEqual(spy.callCount, 4);

  window.removeEventListener.restore();
});

test('should change the value of the slider when the track is pressed', (t) => {
  const wrapper = shallow(<SliderContainer />, options);
  const instance = wrapper.instance();

  instance.createRootRef(elem);

  instance.handleTrackPress({
    x: 40,
    y: 20,
  });

  t.deepEqual(wrapper.state('value'), 40);
});

test('should change the value of the slider when the thumb is moved', (t) => {
  const wrapper = shallow(<SliderContainer />, options);
  const instance = wrapper.instance();

  instance.createRootRef(elem);

  instance.handleMove({
    x: 40,
    y: 20,
  });

  t.deepEqual(wrapper.state('value'), 40);
});

test('should increment the value when the right arrow key is pressed', (t) => {
  const wrapper = shallow(<SliderContainer />, options);
  const instance = wrapper.instance();

  instance.createRootRef(elem);

  instance.handleKeyPress({ keyCode: 39 });

  t.deepEqual(wrapper.state('value'), 2);
});

test('should decrement the value when the left arrow key is pressed', (t) => {
  const wrapper = shallow(<SliderContainer initialValue={2} />, options);
  const instance = wrapper.instance();

  instance.createRootRef(elem);

  instance.handleKeyPress({ keyCode: 37 });

  t.deepEqual(wrapper.state('value'), 0);
});

test('should not change the state when the keyCode shouldn\'t be handled', (t) => {
  const wrapper = shallow(<SliderContainer initialValue={2} />, options);
  const instance = wrapper.instance();

  const prevState = wrapper.state();

  instance.handleKeyPress({ keyCode: 2 });

  t.deepEqual(prevState, wrapper.state());
});
