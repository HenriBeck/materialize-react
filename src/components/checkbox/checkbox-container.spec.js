import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import CheckboxContainer from './checkbox-container.jsx';
import {
  shallow,
  mount,
} from 'tests/enzyme';

test('should render a button', (t) => {
  const wrapper = shallow(<CheckboxContainer name="test" />);

  t.deepEqual(wrapper.find('button').length, 1);
});

test('should get and set the state with the checked property', (t) => {
  const wrapper = mount(<CheckboxContainer name="test" />);
  const instance = wrapper.instance();

  instance.checked = true;

  t.deepEqual(wrapper.state('checked'), true);

  instance.checked = false;

  t.deepEqual(wrapper.state('checked'), false);

  wrapper.setProps({ disabled: true });
});

test('should get the current state with the checked property', (t) => {
  const wrapper = mount(<CheckboxContainer name="test" />);
  const instance = wrapper.instance();

  t.deepEqual(instance.checked, false);
});

test('should have a negative tabIndex and aria-disabled set to true when it\'s disabled', (t) => {
  const wrapper = shallow(
    <CheckboxContainer
      disabled
      name="test"
    />,
  );
  const checkbox = wrapper.find('.checkbox').first();

  t.deepEqual(checkbox.prop('aria-disabled'), true);
  t.deepEqual(checkbox.prop('tabIndex'), -1);
});

test('should have the checked state set to true when the defaultChecked prop is passed', (t) => {
  const wrapper = shallow(
    <CheckboxContainer
      defaultChecked
      name="test"
    />,
  );

  t.deepEqual(wrapper.state('checked'), true);
});

test('should add focus the the ripple and remove it', (t) => {
  const addFocus = sinon.spy();
  const removeFocus = sinon.spy();
  const wrapper = mount(<CheckboxContainer name="test" />);
  const instance = wrapper.instance();

  instance.ripple.addFocus = addFocus;
  instance.ripple.removeFocus = removeFocus;

  wrapper.simulate('focus');
  wrapper.simulate('blur');

  t.deepEqual(addFocus.callCount, 1);
  t.deepEqual(removeFocus.callCount, 1);
});

test('should not update the state when there is no keyCode in a key event', (t) => {
  const wrapper = mount(<CheckboxContainer name="test" />);

  wrapper.simulate('keyDown');

  t.deepEqual(wrapper.state('checked'), false);
});

test('should only update the state when the key is a valid keyCode', (t) => {
  const onKeyDown = sinon.spy();
  const wrapper = mount(
    <CheckboxContainer
      name="test"
      onKeyDown={onKeyDown}
    />,
  );

  t.plan(CheckboxContainer.keyCodes.length * 2);

  CheckboxContainer.keyCodes.forEach((keyCode, index) => {
    wrapper.simulate('keyDown', { keyCode });

    t.deepEqual(onKeyDown.callCount, index + 1);
    t.deepEqual(wrapper.state('checked'), true);

    wrapper.simulate('keyUp');
  });
});

test('should not update the state when the keyUp event hasn\'t fired yet', (t) => {
  const onChange = sinon.spy();
  const wrapper = mount(
    <CheckboxContainer
      name="test"
      onChange={onChange}
    />,
  );

  wrapper.simulate('keyDown', { keyCode: CheckboxContainer.keyCodes[0] });

  t.deepEqual(onChange.callCount, 1);

  wrapper.simulate('keyDown', { keyCode: CheckboxContainer.keyCodes[0] });

  t.deepEqual(onChange.callCount, 1);
});
