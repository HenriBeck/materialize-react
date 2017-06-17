import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';

import CheckboxContainer from './checkbox-container';

test('should be able to change the current state by the checked get and setter', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name" />);
  const instance = wrapper.instance();

  t.deepEqual(instance.checked, false);

  instance.checked = true;

  t.deepEqual(instance.checked, true);

  instance.checked = true;
});

test('should update the state when the component receives / loses focus', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name" />);

  wrapper.simulate('focus');

  t.deepEqual(wrapper.state('isFocused'), true);

  wrapper.simulate('blur');

  t.deepEqual(wrapper.state('isFocused'), false);
});

test('should not toggle the state if no keyCode to onKeyDown is passed', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name" />);

  wrapper.simulate('keyDown', {});

  t.deepEqual(wrapper.state('checked'), false);
});

test('should not update the checkbox if the keyDown handler is called twice', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name" />);

  wrapper.simulate('keyDown', { keyCode: CheckboxContainer.keyCodes[0] });

  t.deepEqual(wrapper.state('checked'), true);

  wrapper.simulate('keyDown', { keyCode: CheckboxContainer.keyCodes[0] });

  t.deepEqual(wrapper.state('checked'), true);
});

test('should reset the isPressingKey property on a key up event', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name" />);
  const instance = wrapper.instance();

  wrapper.simulate('keyDown', { keyCode: CheckboxContainer.keyCodes[0] });

  t.deepEqual(instance.isPressingKey, true);

  wrapper.simulate('keyUp');

  t.deepEqual(instance.isPressingKey, false);
});

test('should toggle the checkbox when a touch event happens', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name" />);
  const instance = wrapper.instance();

  instance.handlePress({ type: 'touchstart' });

  t.deepEqual(wrapper.state('checked'), true);
});

test('should toggle the checkbox when a mouse event happens', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name" />);
  const instance = wrapper.instance();

  instance.handlePress({ type: 'mousedown' });

  t.deepEqual(wrapper.state('checked'), true);
});

test('should not toggle the checkbox when a mouse event happens after a touch event', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name" />);
  const instance = wrapper.instance();

  instance.handlePress({ type: 'touchstart' });

  t.deepEqual(wrapper.state('checked'), true);

  instance.handlePress({ type: 'mousedown' });

  t.deepEqual(wrapper.state('checked'), true);

  instance.handlePress({});
});
