import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import FabWrapper, { Fab } from './fab';
import { mount } from '../../../tests/helpers/enzyme';

test('should render a button', (t) => {
  const wrapper = mount(<FabWrapper icon="build" />);

  t.deepEqual(wrapper.find({ role: 'button' }).length, 1);
  t.deepEqual(wrapper.find('Jss(Fab)').length, 1);
});

test('should have a ripple inside', (t) => {
  const wrapper = mount(<FabWrapper icon="build" />);

  t.deepEqual(wrapper.find('Ripple').length, 1);
});

test('should animate the fab in', (t) => {
  const wrapper = mount(
    <FabWrapper
      animateIn
      icon="build"
    />,
  );
  const transform = wrapper.find({ role: 'button' }).node.style.transform;

  t.deepEqual(transform, 'scale(1) rotate(0deg)');
});

test('should set the aria-disabled attribute on the root node', (t) => {
  const wrapper = mount(
    <FabWrapper
      disabled
      icon="build"
    />,
  );
  const root = wrapper.find({ role: 'button' });

  t.deepEqual(root.prop('aria-disabled'), true);
});

test('should update the shadow when the fab receives / loses focus', (t) => {
  const wrapper = mount(<FabWrapper icon="build" />);
  const shadow = wrapper.find('.fab--shadow');

  wrapper.simulate('focus');

  t.deepEqual(shadow.node.style.opacity, '1');

  wrapper.simulate('blur');

  t.deepEqual(shadow.node.style.opacity, '0');
});

test('should set the isTouchEvent property', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <FabWrapper
      icon="build"
      onPress={onPress}
    />,
  );

  wrapper.simulate('touchStart');

  t.deepEqual(onPress.callCount, 1);
});

test('should not call onPress twice when a touch event happened before a mouse event', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <FabWrapper
      icon="build"
      onPress={onPress}
    />,
  );

  wrapper.simulate('touchStart');

  // Should not call onPress again because isTouchEvent should be true
  wrapper.simulate('mouseDown');

  t.deepEqual(onPress.callCount, 1);

  wrapper.simulate('mouseDown');

  t.deepEqual(onPress.callCount, 2);
});

test('should call the onPress handler when the user presses a key', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <FabWrapper
      icon="build"
      onPress={onPress}
    />,
  );

  wrapper.simulate('keyDown', { keyCode: Fab.keyCodes[0] });

  t.deepEqual(onPress.callCount, 1);
});

test('should not call onPress twice when no keyUp event has happened', (t) => {
  const wrapper = shallow(
    <Fab
      classes={{}}
      theme={{}}
      icon="build"
    />,
  );
  const instance = wrapper.instance();

  wrapper.simulate('keyDown', { keyCode: Fab.keyCodes[0] });

  t.deepEqual(instance.isPressingKey, true);

  wrapper.simulate('keyDown', { keyCode: Fab.keyCodes[0] });
});

test('should only call onPress twice when a keyUp event has happened', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <FabWrapper
      icon="build"
      onPress={onPress}
    />,
  );

  wrapper.simulate('keyDown', { keyCode: Fab.keyCodes[0] });
  wrapper.simulate('keyUp');
  wrapper.simulate('keyDown', { keyCode: Fab.keyCodes[0] });

  t.deepEqual(onPress.callCount, 2);
});

test('should render different styles with the mini prop', (t) => {
  mount(
    <FabWrapper
      icon="build"
      mini
    />,
  );

  t.pass();
});
