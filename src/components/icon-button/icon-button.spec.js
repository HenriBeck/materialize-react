import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import IconButtonWrapper, { IconButton } from './icon-button';
import { mount } from '../../../tests/helpers/enzyme';

test('should render various elements and components', (t) => {
  const wrapper = mount(<IconButtonWrapper icon="github" />);

  t.deepEqual(wrapper.find('Jss(IconButton)').length, 1);
  t.deepEqual(wrapper.find('Ripple').length, 1);
  t.deepEqual(wrapper.find({ role: 'button' }).length, 1);
  t.deepEqual(wrapper.find('Icon').length, 1);
});

test('should have aria-disabled and tabIndex of -1 when disabled', (t) => {
  const wrapper = mount(
    <IconButtonWrapper
      disabled
      icon="github"
    />,
  );
  const button = wrapper.find({ role: 'button' }).first();

  t.deepEqual(button.prop('aria-disabled'), true);
  t.deepEqual(button.prop('tabIndex'), -1);
});

test('should call the event handlers when the mouse or a touch event happens', (t) => {
  const onMouseDown = sinon.spy();
  const onTouchStart = sinon.spy();
  const wrapper = mount(
    <IconButtonWrapper
      icon="github"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    />,
  );

  wrapper.simulate('mouseDown');
  wrapper.simulate('touchStart');

  t.deepEqual(onMouseDown.callCount, 1);
  t.deepEqual(onTouchStart.callCount, 1);
});

test('should call the onPress handler when a mouse or touch event happens', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <IconButtonWrapper
      icon="github"
      onPress={onPress}
    />,
  );

  wrapper.simulate('mouseDown');

  t.deepEqual(onPress.callCount, 1);

  wrapper.simulate('touchStart');

  t.deepEqual(onPress.callCount, 2);
});

test('should add and remove the focus from the ripple', (t) => {
  const onFocus = sinon.spy();
  const onBlur = sinon.spy();
  const wrapper = mount(
    <IconButtonWrapper
      icon="github"
      onFocus={onFocus}
      onBlur={onBlur}
    />,
  );

  wrapper.simulate('focus');

  t.deepEqual(onFocus.callCount, 1);

  wrapper.simulate('blur');

  t.deepEqual(onBlur.callCount, 1);
});

test('should not call the onPress handler when the keyCode isn\'t specified', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <IconButtonWrapper
      icon="github"
      onPress={onPress}
    />,
  );

  wrapper.simulate('keyDown');

  t.deepEqual(onPress.callCount, 0);
});

test('should only call the onPress handler when the keyCode is specified and valid', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <IconButtonWrapper
      icon="github"
      onPress={onPress}
    />,
  );

  t.plan(IconButton.keyCodes.length);

  IconButton.keyCodes.forEach((keyCode, index) => {
    wrapper.simulate('keyDown', { keyCode });

    t.deepEqual(onPress.callCount, index + 1);

    wrapper.simulate('keyUp');
  });
});

test('should not call the onPress handler again if the keyUp handler hasn\'t been called', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <IconButtonWrapper
      icon="github"
      onPress={onPress}
    />,
  );
  const keyCode = IconButton.keyCodes[0];

  wrapper.simulate('keyDown', { keyCode });

  t.deepEqual(onPress.callCount, 1);

  wrapper.simulate('keyDown', { keyCode });

  t.deepEqual(onPress.callCount, 1);
});

test('should be able to call the default event handlers', (t) => {
  IconButton.defaultProps.onFocus();
  IconButton.defaultProps.onBlur();
  IconButton.defaultProps.onPress();
  IconButton.defaultProps.onKeyDown();
  IconButton.defaultProps.onKeyUp();
  IconButton.defaultProps.onTouchStart();
  IconButton.defaultProps.onMouseDown();

  t.pass();
});
