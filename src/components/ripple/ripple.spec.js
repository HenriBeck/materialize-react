import test from 'ava';
import React from 'react';
import sinon from 'sinon';

import { mount } from 'tests/enzyme';
import Ripple from './ripple.jsx';

test('should render 3 spans', (t) => {
  const wrapper = mount(<Ripple />);

  t.deepEqual(wrapper.find('span').length, 3);
});

test('should increment the zIndex of the parent with 1 so the ripple is always on top', (t) => {
  const wrapper = mount(<Ripple style={{ zIndex: 5 }} />);
  const root = wrapper.find('.ripple');

  t.deepEqual(root.node.style['z-index'], '6');
});

test('should add pointerEvents none to the root when the nowaves prop is passed', (t) => {
  const wrapper = mount(<Ripple nowaves />);
  const root = wrapper.find('.ripple');

  t.deepEqual(root.prop('style').pointerEvents, 'none');
});

test('should be able to add focus to the ripple', (t) => {
  const wrapper = mount(<Ripple />);
  const instance = wrapper.instance();

  instance.addFocus();

  const span = wrapper.find('.ripple--focus');

  t.deepEqual(instance.isFocused, true);
  t.deepEqual(span.node.style.opacity, String(instance.props.focusOpacity));
});

test('should scale the ripple in when the ripple is round', (t) => {
  const wrapper = mount(<Ripple round />);
  const instance = wrapper.instance();

  instance.addFocus();

  const span = wrapper.find('.ripple--focus');

  t.deepEqual(span.node.style.transform, 'scale(1)');

  instance.removeFocus();

  t.deepEqual(span.node.style.transform, 'scale(0)');
});

test('should be able to remove the focus', (t) => {
  const wrapper = mount(<Ripple />);
  const instance = wrapper.instance();

  instance.addFocus();

  instance.removeFocus();

  const span = wrapper.find('.ripple--focus');

  t.deepEqual(instance.isFocused, false);
  t.deepEqual(span.node.style.opacity, '0');
});

test('should not fade the focus element in when the element is already in focus state', (t) => {
  const wrapper = mount(<Ripple />);
  const instance = wrapper.instance();

  instance.addFocus();

  instance.addFocus();

  t.deepEqual(instance.isFocused, true);
});

test('should only fade out the focus element when the element is already in focus state', (t) => {
  const wrapper = mount(<Ripple />);
  const instance = wrapper.instance();

  instance.removeFocus();

  t.deepEqual(instance.isFocused, false);
});

test('should be able to change the focus color', (t) => {
  const wrapper = mount(<Ripple />);
  const instance = wrapper.instance();

  instance.focusColor = 'black';

  const span = wrapper.find('.ripple--focus');

  t.deepEqual(span.node.style['background-color'], 'black');

  instance.addFocus();

  instance.focusColor = 'white';

  t.deepEqual(span.node.style['background-color'], 'white');
});

test('should add the ripple where the user clicked', (t) => {
  const wrapper = mount(<Ripple />);

  wrapper.simulate('mouseDown', {
    x: 10,
    y: 10,
  });

  const radius = wrapper.find('Wave').prop('radius');

  t.notDeepEqual(radius, 0);
});

test('should handle touch start event and add a wave', (t) => {
  const onTouchStart = sinon.spy();
  const wrapper = mount(<Ripple onTouchStart={onTouchStart} />);

  wrapper.simulate('touchStart');

  t.deepEqual(onTouchStart.callCount, 1);
  t.deepEqual(wrapper.state('waves').length, 1);
});

test('should handle touch end event and add remove the wave', (t) => {
  const onTouchEnd = sinon.spy();
  const wrapper = mount(<Ripple onTouchEnd={onTouchEnd} />);
  const instance = wrapper.instance();

  wrapper.simulate('touchStart');

  wrapper.simulate('touchEnd');

  instance.waves['1'].animation.onfinish();

  t.deepEqual(onTouchEnd.callCount, 1);
  t.deepEqual(wrapper.state('waves').length, 0);
});

test('should handle mouse down event and add a wave', (t) => {
  const onMouseDown = sinon.spy();
  const wrapper = mount(<Ripple onMouseDown={onMouseDown} />);

  wrapper.simulate('mouseDown');

  t.deepEqual(onMouseDown.callCount, 1);
  t.deepEqual(wrapper.state('waves').length, 1);
});

test('should handle mouse up event and add remove the wave', (t) => {
  const onMouseUp = sinon.spy();
  const wrapper = mount(<Ripple onMouseUp={onMouseUp} />);
  const instance = wrapper.instance();

  wrapper.simulate('mouseDown');

  wrapper.simulate('mouseUp');

  instance.waves['1'].animation.onfinish();

  t.deepEqual(onMouseUp.callCount, 1);
  t.deepEqual(wrapper.state('waves').length, 0);
});

test('should work without providing event handlers', (t) => {
  const wrapper = mount(<Ripple />);

  wrapper.simulate('mouseDown');
  wrapper.simulate('mouseUp');

  wrapper.simulate('touchStart');
  wrapper.simulate('touchEnd');

  t.pass();
});
