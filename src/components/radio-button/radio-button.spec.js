import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import RadioButton from './radio-button.jsx';
import { mount } from 'tests/enzyme';
import hexToRgba from 'styles/functions/hex-to-rgba';

test('should render a button', (t) => {
  const wrapper = mount(<RadioButton name="test" />);

  t.deepEqual(wrapper.find('button').length, 1);
});

test('should animate the circle in when defaultOn is passed', (t) => {
  const wrapper = mount(
    <RadioButton
      defaultOn
      name="test"
    />,
  );

  t.deepEqual(wrapper.state('on'), true);
  const circle = wrapper.find('.radio-button--circle');

  t.deepEqual(circle.node.style.transform, 'scale(1)');
});

test('should animate the circle out when the state changes', (t) => {
  const wrapper = mount(
    <RadioButton
      defaultOn
      name="test"
    />,
  );
  const instance = wrapper.instance();

  instance.on = false;

  const circle = wrapper.find('.radio-button--circle');

  t.deepEqual(circle.node.style.transform, 'scale(0)');
});

test('should be able to change the state with the on property', (t) => {
  const wrapper = mount(<RadioButton name="test" />);
  const instance = wrapper.instance();

  instance.on = true;

  t.deepEqual(wrapper.state('on'), true);
});

test('should aria-disabled and tabIndex of -1 set when the button is disabled', (t) => {
  const wrapper = mount(
    <RadioButton
      disabled
      name="test"
    />,
  );
  const button = wrapper.find('button');

  t.deepEqual(button.prop('tabIndex'), -1);
  t.deepEqual(button.prop('aria-disabled'), true);
});

test('should update the circle color when the disabled prop changes', (t) => {
  const wrapper = mount(<RadioButton name="test" />);
  const theme = wrapper.instance().theme;
  const circle = wrapper.find('.radio-button--circle');

  wrapper.setProps({ disabled: true });

  t.deepEqual(circle.node.style.backgroundColor, theme.disabledColor);

  wrapper.setProps({ disabled: false });

  t.deepEqual(circle.node.style.backgroundColor, hexToRgba(theme.onColor, false));
});

test('should not update anything special if the state or the disabled prop not changes', (t) => {
  const wrapper = mount(<RadioButton name="test" />);

  wrapper.setProps({ labelPosition: 'left' });

  t.pass();
});

test('should work with focus events', (t) => {
  const onFocus = sinon.spy();
  const onBlur = sinon.spy();
  const wrapper = mount(
    <RadioButton
      name="test"
      onFocus={onFocus}
      onBlur={onBlur}
    />,
  );

  wrapper.simulate('focus');

  t.deepEqual(onFocus.callCount, 1);

  wrapper.simulate('blur');

  t.deepEqual(onBlur.callCount, 1);
});

test('focus events should work without passing handlers', (t) => {
  const wrapper = mount(<RadioButton name="test" />);

  wrapper.simulate('focus');

  wrapper.simulate('blur');

  t.pass();
});

test('should not update the button when the key isn\'t inside the keyCodes array', (t) => {
  const wrapper = mount(<RadioButton name="test" />);

  wrapper.simulate('keyDown');

  t.deepEqual(wrapper.state('on'), false);
});

test('should only update the button when the key is inside the keyCodes array', (t) => {
  const wrapper = mount(<RadioButton name="test" />);

  t.plan(RadioButton.keyCodes.length);

  RadioButton.keyCodes.forEach((keyCode) => {
    wrapper.simulate('keyDown', { keyCode });

    t.deepEqual(wrapper.state('on'), true);

    wrapper.simulate('keyUp');
  });
});

test('should not update the button when the key is already pressed', (t) => {
  const wrapper = mount(<RadioButton name="test" />);

  wrapper.simulate('keyDown', { keyCode: RadioButton.keyCodes[0] });

  t.deepEqual(wrapper.state('on'), true);

  wrapper.simulate('keyDown', { keyCode: RadioButton.keyCodes[0] });

  t.deepEqual(wrapper.state('on'), true);
});
