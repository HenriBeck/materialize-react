import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import CheckboxContainer from './checkbox-container';

test('should be able to change the current state by the checked get and setter', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name">Test</CheckboxContainer>);
  const instance = wrapper.instance();

  t.deepEqual(instance.checked, false);

  instance.checked = true;

  t.deepEqual(instance.checked, true);

  instance.checked = true;
});

test('should update the state when the component receives / loses focus', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name">Test</CheckboxContainer>);

  wrapper.simulate('focus');

  t.deepEqual(wrapper.state('isFocused'), true);

  wrapper.simulate('blur');

  t.deepEqual(wrapper.state('isFocused'), false);
});

test('should toggle the state when the toggle method is called', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name">Test</CheckboxContainer>);
  const instance = wrapper.instance();

  instance.toggle();

  t.deepEqual(wrapper.state('checked'), true);
});

test('should call the onChange prop when the toggle method is called', (t) => {
  const onChange = sinon.spy();
  const instance = shallow(
    <CheckboxContainer
      name="name"
      onChange={onChange}
    >
      Test
    </CheckboxContainer>,
  ).instance();

  instance.toggle();

  t.deepEqual(onChange.callCount, 1);
});

test('should toggle the state when the handlePress method get\'s called', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name">Test</CheckboxContainer>);
  const instance = wrapper.instance();

  instance.handlePress();

  t.deepEqual(wrapper.state('checked'), true);
});

test('should not toggle the state when the handleKeyPress receives an invalid keyCode', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name">Test</CheckboxContainer>);
  const instance = wrapper.instance();

  instance.handleKeyPress({ keyCode: 0 });

  t.deepEqual(wrapper.state('checked'), false);
});

test('should toggle the state when the handleKeyPres receives a valid keyCode', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name">Test</CheckboxContainer>);
  const instance = wrapper.instance();

  instance.handleKeyPress({ keyCode: CheckboxContainer.keyCodes[0] });

  t.deepEqual(wrapper.state('checked'), true);
});
