import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import IconButton from './icon-button';
import {
  shallow,
  mount,
} from '/tests/helpers/enzyme';

test('should render a button and should have an Icon inside', (t) => {
  const wrapper = shallow(<IconButton icon="github" />);

  t.deepEqual(wrapper.find('button').length, 1);
  t.deepEqual(wrapper.find('Icon').length, 1);
});

test('should have a ripple inside', (t) => {
  const wrapper = shallow(<IconButton icon="github" />);

  t.deepEqual(wrapper.find('Ripple').length, 1);
});

test('should have aria-disabled and tabIndex of -1 when disabled', (t) => {
  const wrapper = shallow(
    <IconButton
      disabled
      icon="github"
    />,
  );
  const button = wrapper.find('button').first();

  t.deepEqual(button.prop('aria-disabled'), true);
  t.deepEqual(button.prop('tabIndex'), -1);
});

test('should call the event handlers when the mouse or a touch event happens', (t) => {
  const onMouseDown = sinon.spy();
  const onTouchStart = sinon.spy();
  const wrapper = shallow(
    <IconButton
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
  const wrapper = shallow(
    <IconButton
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
    <IconButton
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

test('should add focus to the ripple when the component get\'s focused', (t) => {
  const wrapper = mount(<IconButton icon="github" />);
  const instance = wrapper.instance();

  instance.ripple.addFocus = sinon.spy();
  instance.ripple.removeFocus = sinon.spy();

  wrapper.simulate('focus');

  t.deepEqual(instance.ripple.addFocus.callCount, 1);

  wrapper.simulate('blur');

  t.deepEqual(instance.ripple.removeFocus.callCount, 1);
});

test('should not call the onPress handler when the keyCode isn\'t specified', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <IconButton
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
    <IconButton
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
    <IconButton
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
