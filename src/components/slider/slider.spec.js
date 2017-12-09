import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import { mount } from '../../../tests/helpers/enzyme';

import Slider from './slider';

test('should render a div with the role of slider', (t) => {
  const wrapper = mount(<Slider value={0} />);

  t.deepEqual(wrapper.find('div[role="slider"]').length, 1);
});

test('should add a EventListener when the thumb is being dragged', (t) => {
  const wrapper = mount(<Slider value={0} />, { type: 'dark' });

  wrapper.find('.slider--thumb').simulate('mouseDown');

  t.deepEqual(wrapper.find('EventListener').length, 1);

  wrapper.find('EventListener').prop('onMouseUp')();
});

test('should set the aria disabled prop to true', (t) => {
  const wrapper = mount(<Slider value={0} />);

  wrapper.setProps({ disabled: true });

  t.deepEqual(wrapper.find('.slider').prop('aria-disabled'), true);
});

test('should update the state when the value prop changes', (t) => {
  const wrapper = mount(<Slider value={0} />);

  wrapper.setProps({ value: 50 });

  t.deepEqual(wrapper.find('.slider').prop('aria-valuenow'), 50);
});

test('should call the onChange prop when the track is clicked', (t) => {
  const onChange = sinon.spy();
  const wrapper = mount(
    <Slider
      value={0}
      onChange={onChange}
    />,
  );

  wrapper
    .find('.slider--track')
    .simulate('click', {
      x: 4,
      y: 4,
    });

  t.deepEqual(onChange.callCount, 1);
});

test('should call the onChange prop when the key is pressed', (t) => {
  const onChange = sinon.spy();
  const wrapper = mount(
    <Slider
      value={0}
      onChange={onChange}
    />,
  );

  wrapper
    .find('.slider')
    .simulate('keyDown', { keyCode: 37 });

  wrapper
    .find('.slider')
    .simulate('keyDown', { keyCode: null });

  t.deepEqual(onChange.callCount, 1);
});

test('should add focused classes when the isFocused prop is passed', (t) => {
  const wrapper = mount(<Slider value={0} />);

  wrapper.find('.slider').simulate('focus');

  t.deepEqual(wrapper.find('.slider--thumb-focused').length, 1);
});
