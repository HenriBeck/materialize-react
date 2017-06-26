import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import SwitchContainer from './switch-container';

test('should get the state with the toggled getter', (t) => {
  const wrapper = shallow(<SwitchContainer name="test">Label</SwitchContainer>);
  const instance = wrapper.instance();

  t.deepEqual(instance.toggled, false);
});

test('should set the state with the toggled getter', (t) => {
  const wrapper = shallow(<SwitchContainer name="test">Label</SwitchContainer>);
  const instance = wrapper.instance();

  instance.toggled = true;

  t.deepEqual(instance.toggled, true);

  instance.toggled = true;
});

test('should toggle the state when the onPress handler get\'s called', (t) => {
  const wrapper = shallow(<SwitchContainer name="test">Label</SwitchContainer>);
  const instance = wrapper.instance();

  instance.handlePress();

  t.deepEqual(instance.toggled, true);
});

test('should call the onChange prop when the toggle method get\'s called', (t) => {
  const onChange = sinon.spy();
  const wrapper = shallow(
    <SwitchContainer
      name="test"
      onChange={onChange}
    >
      Label
    </SwitchContainer>,
  );
  const instance = wrapper.instance();

  instance.toggle();

  t.deepEqual(onChange.callCount, 1);
});

test('should change the isFocused state when the focus and blur methods get called', (t) => {
  const wrapper = shallow(<SwitchContainer name="test">Label</SwitchContainer>);
  const instance = wrapper.instance();

  instance.handleFocus();

  t.deepEqual(wrapper.state('isFocused'), true);

  instance.handleBlur();

  t.deepEqual(wrapper.state('isFocused'), false);
});

test('should only toggle the state when a key event has the correct keyCode', (t) => {
  const wrapper = shallow(<SwitchContainer name="test">Label</SwitchContainer>);
  const instance = wrapper.instance();

  instance.handleKeyPress({ keyCode: SwitchContainer.keyCodes[0] });

  t.deepEqual(instance.toggled, true);
});

test('should not toggle the state when a key event has no keyCode', (t) => {
  const wrapper = shallow(<SwitchContainer name="test">Label</SwitchContainer>);
  const instance = wrapper.instance();

  instance.handleKeyPress({});

  t.deepEqual(instance.toggled, false);
});

