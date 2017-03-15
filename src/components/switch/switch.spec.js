import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import { mount } from '/tests/helpers/enzyme';
import Switch from './switch';

test('should render a button', (t) => {
  const wrapper = mount(<Switch name="test" />);

  t.deepEqual(wrapper.find('button').length, 1);
});

test('should have the toggled state set to true when defaultToggled prop is passed', (t) => {
  const wrapper = mount(
    <Switch
      defaultToggled
      name="test"
    />,
  );

  t.deepEqual(wrapper.state('toggled'), true);
});

test('should update the component when the disabled prop changes', (t) => {
  const wrapper = mount(<Switch name="test" />);

  wrapper.setProps({ disabled: true });

  t.deepEqual(wrapper.find('button').prop('tabIndex'), -1);
});

test('should not update the elements when neither the state or the disabled prop changes', (t) => {
  const wrapper = mount(<Switch name="test" />);

  wrapper.setProps({ name: 'test2' });

  t.pass();
});

test('should be able to add focus and remove it and call the handler', (t) => {
  const onFocus = sinon.spy();
  const onBlur = sinon.spy();
  const wrapper = mount(
    <Switch
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

test('focus events should work with no event handlers', (t) => {
  const wrapper = mount(<Switch name="test" />);

  wrapper.simulate('focus');

  wrapper.simulate('blur');

  t.pass();
});

test('should not toggle the button when no keyCode is provided', (t) => {
  const wrapper = mount(<Switch name="test" />);

  wrapper.simulate('keyDown');

  t.deepEqual(wrapper.state('toggled'), false);
});

test('should only update the state when a valid key is pressed', (t) => {
  const wrapper = mount(<Switch name="test" />);

  t.plan(Switch.keyCodes.length);

  Switch.keyCodes.forEach((keyCode, index) => {
    wrapper.simulate('keyDown', { keyCode });

    t.deepEqual(wrapper.state('toggled'), index % 2 === 0);

    wrapper.simulate('keyUp');
  });
});
