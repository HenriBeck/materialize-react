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

test('should not call the onPress prop when no key code was passed to the handler', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <Button
      onPress={onPress}
      classes={classes}
    />,
  );

  wrapper.simulate('keyDown');

  t.deepEqual(onPress.callCount, 0);
});

test('should call the onPress prop when a valid key code was passed to the handler', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <Button
      onPress={onPress}
      classes={classes}
    />,
  );

  wrapper.simulate('keyDown', { keyCode: Button.keyCodes[0] });

  t.deepEqual(onPress.callCount, 1);
});

test('should handle onFocus and onBlur events and add focus to the element', (t) => {
  const wrapper = mount(<Button classes={classes} />);

  wrapper.simulate('focus');

  t.deepEqual(wrapper.state('isFocused'), true);

  wrapper.simulate('blur');

  t.deepEqual(wrapper.state('isFocused'), false);
});
