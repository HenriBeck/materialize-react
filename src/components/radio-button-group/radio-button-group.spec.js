import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import RadioButton from '../radio-button';

import RadioButtonGroup from './radio-button-group';

/**
 * A utility function to render a radio button group with the required children.
 *
 * @returns {Object} - Returns the wrapper created by enzyme.
 */
function renderWrapper() {
  return shallow(
    <RadioButtonGroup
      name="test"
      defaultSelected="test1"
      label="label"
    >
      <RadioButton name="test1">Test 1</RadioButton>
      <RadioButton name="test2">Test 2</RadioButton>
      <RadioButton name="test3">Test 3</RadioButton>
    </RadioButtonGroup>,
  );
}

test('should throw an error if we only pass 2 or less RadioButtons as the children', (t) => {
  t.throws(() => shallow(
    <RadioButtonGroup
      name="test"
      defaultSelected="test"
    >
      <RadioButton />
    </RadioButtonGroup>,
  ));
});

test('should throw an error if we pass a non RadioButton as a child', (t) => {
  t.throws(() => shallow(
    <RadioButtonGroup
      name="test"
      defaultSelected="test"
    >
      <div />
    </RadioButtonGroup>,
  ));
});

test('should throw an error if we pass two RadioButtons with the same name', (t) => {
  t.throws(() => shallow(
    <RadioButtonGroup
      name="test"
      defaultSelected="test"
    >
      <RadioButton name="test" />
      <RadioButton name="test" />
      <RadioButton name="test3" />
    </RadioButtonGroup>,
  ));
});

test('should get the currently selected button with the \'selected\' getter', (t) => {
  const wrapper = renderWrapper();
  const instance = wrapper.instance();

  t.deepEqual(instance.selected, 'test1');
});

test('should change the state with the selected property', (t) => {
  const wrapper = renderWrapper();
  const instance = wrapper.instance();

  instance.selected = 'test2';

  t.deepEqual(wrapper.state('selected'), 'test2');
});

test('should change the focused state to the first radio button when onFocus is called', (t) => {
  const wrapper = renderWrapper();

  wrapper.simulate('focus');

  t.deepEqual(wrapper.state('focused'), 'test1');
});

test('should change the focused state back to \'null\' when onBlur is called', (t) => {
  const wrapper = renderWrapper();

  wrapper.simulate('focus');
  wrapper.simulate('blur');

  t.deepEqual(wrapper.state('focused'), null);
});

test('should change the selected state when one of the radio buttons get pressed', (t) => {
  const wrapper = renderWrapper();
  const instance = wrapper.instance();

  instance.createHandlePress('test2')();

  t.deepEqual(wrapper.state('selected'), 'test2');
});

test('should not call onChange twice when the same radio button get\'s pressed twice', (t) => {
  const wrapper = renderWrapper();
  const onChange = sinon.spy();
  const instance = wrapper.instance();
  const handlePress = instance.createHandlePress('test2');

  wrapper.setProps({ onChange });

  handlePress();
  handlePress();

  t.deepEqual(onChange.callCount, 1);
});

test('should change the focus state when the down arrow get\'s pressed', (t) => {
  const wrapper = renderWrapper();
  const instance = wrapper.instance();

  wrapper.simulate('focus');
  wrapper.simulate('focus');

  instance.handleKeyPress({ keyCode: 40 });

  t.deepEqual(wrapper.state('focused'), 'test2');
});

test('should change the selected state when the space bar is pressed', (t) => {
  const wrapper = renderWrapper();
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  instance.handleKeyPress({ keyCode: 40 });
  instance.handleKeyPress({ keyCode: 13 });

  t.deepEqual(wrapper.state('selected'), 'test2');
});

test('should not change the selected state when the focused button is the selected', (t) => {
  const wrapper = renderWrapper();
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  instance.handleKeyPress({ keyCode: 13 });

  t.deepEqual(wrapper.state('selected'), 'test1');
});
