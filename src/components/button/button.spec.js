import test from 'ava';
import React from 'react';
import {
  shallow,
  mount,
} from 'tests/enzyme';
import sinon from 'sinon';

import Button from './button.jsx';

test('should render the button', (t) => {
  const wrapper = shallow(<Button />);

  t.deepEqual(wrapper.find('button').length, 1);
});

test('check if the elevation is computed correctly', (t) => {
  const wrapper = mount(<Button />);
  const instance = wrapper.instance();

  t.deepEqual(instance.elevation, 0);

  wrapper.setProps({ raised: true });

  t.deepEqual(instance.elevation, instance.theme.elevation);

  wrapper.simulate('mouseDown');

  t.deepEqual(instance.elevation, instance.theme.pressedElevation);
});

test('should compute the background color correctly', (t) => {
  const wrapper = shallow(<Button />);
  const instance = wrapper.instance();
  const theme = instance.theme;

  t.deepEqual(instance.backgroundColor, theme.bgColor);

  wrapper.setProps({ raised: true });

  t.deepEqual(instance.backgroundColor, theme.raisedBgColor);

  wrapper.setProps({ disabled: true });

  t.deepEqual(instance.backgroundColor, theme.raisedAndDisabledBgColor);

  wrapper.setProps({ raised: false });

  t.deepEqual(instance.backgroundColor, theme.disabledBgColor);
});

test('should have tabIndex 0 when the button isn\'t disabled and -1 when isn\'t disabled', (t) => {
  const wrapper = shallow(<Button disabled />);
  const button = wrapper.find('button');

  t.deepEqual(button.prop('tabIndex'), -1);
  t.deepEqual(button.prop('aria-disabled'), true);
});

test('should change the state when an interaction happens', (t) => {
  const wrapper = mount(<Button raised />);

  wrapper.simulate('mouseDown');

  t.deepEqual(wrapper.state('pressed'), true);

  wrapper.simulate('mouseUp');

  t.deepEqual(wrapper.state('pressed'), false);
});

test('should have a Ripple inside the button', (t) => {
  const wrapper = shallow(<Button>Test</Button>);

  t.deepEqual(wrapper.find('Ripple').length, 1);
});

test('should handle onFocus and onBlur events and add focus to the element', (t) => {
  const onFocus = sinon.spy();
  const onBlur = sinon.spy();
  const wrapper = mount(
    <Button
      onFocus={onFocus}
      onBlur={onBlur}
    />,
  );

  wrapper.simulate('focus');

  t.deepEqual(onFocus.callCount, 1);

  wrapper.simulate('blur');

  t.deepEqual(onBlur.callCount, 1);
});

test('should handle touch events and call the specific handlers', (t) => {
  const onTouchStart = sinon.spy();
  const onTouchEnd = sinon.spy();
  const wrapper = mount(
    <Button
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    />,
  );

  wrapper.simulate('touchStart');

  t.deepEqual(onTouchStart.callCount, 1);

  wrapper.simulate('touchEnd');

  t.deepEqual(onTouchEnd.callCount, 1);
});

test('should not handle key events if the keyCode doesn\'t match', (t) => {
  const wrapper = shallow(<Button />);

  wrapper.simulate('keyDown');

  t.deepEqual(wrapper.state('pressed'), false);
});

test('should only handle key events where the key codes match', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(<Button onPress={onPress} />);

  t.plan(Button.keyCodes.length);

  Button.keyCodes.forEach((keyCode, index) => {
    wrapper.simulate('keyDown', { keyCode });

    t.deepEqual(onPress.callCount, index + 1);

    wrapper.simulate('keyUp');
  });
});

test('should only update the state when a key is not already pressed', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(<Button onPress={onPress} />);

  wrapper.simulate('keyDown', { keyCode: Button.keyCodes[0] });

  t.deepEqual(onPress.callCount, 1);

  wrapper.simulate('keyDown', { keyCode: Button.keyCodes[0] });

  t.deepEqual(onPress.callCount, 1);
});

test('should handle mouse events and call the specific handlers', (t) => {
  const onMouseDown = sinon.spy();
  const onMouseUp = sinon.spy();
  const wrapper = mount(
    <Button
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />,
  );

  wrapper.simulate('mouseDown');

  t.deepEqual(onMouseDown.callCount, 1);

  wrapper.simulate('mouseUp');

  t.deepEqual(onMouseUp.callCount, 1);
});

test('should work then no handlers are passed', (t) => {
  const wrapper = mount(<Button />);

  wrapper.simulate('touchStart');
  wrapper.simulate('touchEnd');

  wrapper.simulate('focus');
  wrapper.simulate('blur');

  t.pass();
});
