import test from 'ava';
import React from 'react';
import {
  shallow,
  mount,
} from '../../../tests/helpers/enzyme';
import sinon from 'sinon';

import ButtonWrapper, { Button } from './button';

const classes = {
  button: 'button',
  buttonPressed: 'button--pressed',
};

test('should render the button', (t) => {
  const wrapper = mount(<ButtonWrapper />);

  t.deepEqual(wrapper.find('Jss(Button)').length, 1);
  t.deepEqual(wrapper.find({ role: 'button' }).length, 1);
});

test('should render the button with different styles', (t) => {
  const wrapper = mount(<ButtonWrapper raised />);
  const button = wrapper.find('Button');
  const bgColor = () => button.prop('sheet').rules.map.button.renderable.style['background-color'];
  const theme = wrapper.context('theme').button;

  t.deepEqual(bgColor(), theme.raisedBgColor);

  wrapper.setProps({ disabled: true });

  t.deepEqual(bgColor(), theme.raisedAndDisabledBgColor);

  wrapper.setProps({ raised: false });

  t.deepEqual(bgColor(), theme.disabledBgColor);
});

test('should have tabIndex 0 when the button isn\'t disabled and -1 when isn\'t disabled', (t) => {
  const wrapper = shallow(
    <Button
      disabled
      classes={classes}
    />,
  );
  const button = wrapper.find({ role: 'button' });

  t.deepEqual(button.prop('tabIndex'), -1);
  t.deepEqual(button.prop('aria-disabled'), true);
});

test('should change the state when an interaction happens', (t) => {
  const wrapper = mount(
    <Button
      raised
      classes={classes}
    />,
  );

  wrapper.simulate('mouseDown');

  t.deepEqual(wrapper.state('pressed'), true);

  wrapper.simulate('mouseUp');

  t.deepEqual(wrapper.state('pressed'), false);
});

test('should have a Ripple inside the button', (t) => {
  const wrapper = mount(<Button classes={classes} />);

  t.deepEqual(wrapper.find('RippleContainer').length, 1);
});

test('should handle onFocus and onBlur events and add focus to the element', (t) => {
  const onFocus = sinon.spy();
  const onBlur = sinon.spy();
  const wrapper = mount(
    <Button
      classes={classes}
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
      classes={classes}
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
  const wrapper = shallow(<Button classes={classes} />);

  wrapper.simulate('keyDown');

  t.deepEqual(wrapper.state('pressed'), false);
});

test('should only handle key events where the key codes match', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <Button
      classes={classes}
      onPress={onPress}
    />,
  );

  t.plan(Button.keyCodes.length);

  Button.keyCodes.forEach((keyCode, index) => {
    wrapper.simulate('keyDown', { keyCode });

    t.deepEqual(onPress.callCount, index + 1);

    wrapper.simulate('keyUp');
  });
});

test('should only update the state when a key is not already pressed', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <Button
      classes={classes}
      onPress={onPress}
    />,
  );

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
      classes={classes}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />,
  );

  wrapper.simulate('mouseDown');

  t.deepEqual(onMouseDown.callCount, 1);

  wrapper.simulate('mouseUp');

  t.deepEqual(onMouseUp.callCount, 1);
});

test('All default event handlers can be called', (t) => {
  Button.defaultProps.onBlur();
  Button.defaultProps.onFocus();

  Button.defaultProps.onMouseDown();
  Button.defaultProps.onMouseUp();

  Button.defaultProps.onTouchStart();
  Button.defaultProps.onTouchEnd();

  t.pass();
});
