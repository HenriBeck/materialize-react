import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Slider from './slider';

const elem = {
  getBoundingClientRect() {
    return {};
  },
};

test('should render a SliderContainer', (t) => {
  const wrapper = shallow(<Slider />);

  t.deepEqual(wrapper.find('Jss(SliderContainer)').length, 1);
});

test('should get the current value by value property', (t) => {
  const wrapper = shallow(<Slider />);
  const instance = wrapper.instance();

  t.deepEqual(instance.value, 0);
});

test('should set the initial translate on mount', (t) => {
  const wrapper = shallow(<Slider />);
  const instance = wrapper.instance();

  instance.createRootRef(elem);

  instance.componentDidMount();

  t.deepEqual(wrapper.state('translateX'), NaN);
});

test('should be able to change the current value state with the value property', (t) => {
  const wrapper = shallow(<Slider />);
  const instance = wrapper.instance();

  instance.createRootRef(elem);

  instance.value = 50;

  t.deepEqual(wrapper.state('value'), 50);
});

test('should call onChange when the value state changes', (t) => {
  const onChange = sinon.spy();
  const wrapper = shallow(<Slider onChange={onChange} />);
  const instance = wrapper.instance();

  instance.createRootRef(elem);

  instance.value = 40;

  t.deepEqual(onChange.callCount, 1);

  wrapper.setProps({ className: 'test' });

  t.deepEqual(onChange.callCount, 1);
});

test('should update the isFocused state when the handlers are called', (t) => {
  const wrapper = shallow(<Slider />);
  const instance = wrapper.instance();

  instance.handleFocus();

  t.deepEqual(wrapper.state('isFocused'), true);

  instance.handleBlur();

  t.deepEqual(wrapper.state('isFocused'), false);
});

test('should update the isDragging state when the thumb is pressed and released', (t) => {
  const wrapper = shallow(<Slider />);
  const instance = wrapper.instance();

  instance.handleThumbPress();

  t.deepEqual(wrapper.state('isDragging'), true);

  instance.handleThumbRelease();

  t.deepEqual(wrapper.state('isDragging'), false);
});

test('should update the state when the handleMove handler is called', (t) => {
  const wrapper = shallow(<Slider />);
  const instance = wrapper.instance();

  instance.createRootRef(elem);

  instance.handleMove({
    x: 4,
    y: 4,
  });

  t.deepEqual(wrapper.state('value'), NaN);
});

test('should decrement the value by 2 when the right arrow key is pressed', (t) => {
  const wrapper = shallow(<Slider />);
  const instance = wrapper.instance();

  instance.createRootRef(elem);

  instance.handleKeyPress({ keyCode: 38 });

  t.deepEqual(wrapper.state('value'), 2);
});

test('should increment the value by 2 when the right arrow key is pressed', (t) => {
  const wrapper = shallow(<Slider initialValue={40} />);
  const instance = wrapper.instance();

  instance.createRootRef(elem);

  instance.handleKeyPress({ keyCode: 40 });

  t.deepEqual(wrapper.state('value'), 38);
});

test('should not change the state when the keyCode isn\'t valid', (t) => {
  const wrapper = shallow(<Slider />);
  const instance = wrapper.instance();

  instance.createRootRef(elem);

  instance.handleKeyPress({ keyCode: 0 });

  t.deepEqual(wrapper.state('value'), 0);
});
