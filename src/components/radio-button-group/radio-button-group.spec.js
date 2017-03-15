import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import { mount } from '/tests/helpers/enzyme';
import RadioButtonGroup from './radio-button-group';
import RadioButton from '../radio-button';

function render(props = {}) {
  return mount(
    <RadioButtonGroup
      name="test"
      defaultSelected="test1"
      {...props}
    >
      <RadioButton name="test1">Test 1</RadioButton>
      <RadioButton name="test2">Test 2</RadioButton>
    </RadioButtonGroup>,
  );
}

test('should render a div with a role of radiogroup', (t) => {
  const wrapper = render();

  t.deepEqual(wrapper.find({ role: 'radiogroup' }).length, 1);
});

test('should throw an error if only one or less RadioButton\'s are passed', (t) => {
  t.throws(() => (
    <RadioButtonGroup
      name="test"
      defaultSelected="test1"
    >
      <RadioButton name="test1" />
    </RadioButtonGroup>
  ));
});

test('should also include other type of elements', (t) => {
  const wrapper = mount(
    <RadioButtonGroup
      name="test"
      defaultSelected="test1"
    >
      <RadioButton name="test1" />
      <RadioButton name="test2" />
      <div>Content</div>
    </RadioButtonGroup>,
  );

  t.true(wrapper.contains(<div>Content</div>));
});

test('should update the group when a radio button is changed', (t) => {
  const wrapper = render();
  const instance = wrapper.instance();
  const radioButton = wrapper
    .find('RadioButton')
    .last()
    .find('.radio-button--container');

  radioButton.simulate('mouseDown');

  t.deepEqual(instance.selectedButton, 'test2');
});

test('should not call the onChange function when the handleChange function is', (t) => {
  const onChange = sinon.spy();
  const wrapper = render({ onChange });
  const instance = wrapper.instance();

  instance.handleChange('test2', false);
  instance.handleChange('test1', true);

  t.deepEqual(onChange.callCount, 1);
  t.true(onChange.calledWith('test', 'test1'));
});

test('should focus/blur the currently selected button when the group receives an event', (t) => {
  const props = {
    onFocus: sinon.spy(),
    onBlur: sinon.spy(),
  };
  const wrapper = render(props);

  wrapper.simulate('focus');
  wrapper.simulate('blur');

  t.deepEqual(props.onFocus.callCount, 1);
  t.deepEqual(props.onBlur.callCount, 1);
});

test('should call the key down and up handler', (t) => {
  const props = {
    onKeyDown: sinon.spy(),
    onKeyUp: sinon.spy(),
  };
  const wrapper = render(props);

  wrapper.simulate('keyDown');
  wrapper.simulate('keyUp');

  t.deepEqual(props.onKeyDown.callCount, 1);
  t.deepEqual(props.onKeyUp.callCount, 1);
});

test('should not update the buttons if the active button is the same as the selected', (t) => {
  const wrapper = render();
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  wrapper.simulate('keyDown', { keyCode: 32 });

  t.deepEqual(instance.selectedButton, 'test1');
});

test('should update the buttons if the active button is not the same as the selected', (t) => {
  const wrapper = render();
  const instance = wrapper.instance();

  instance.focusedButton = 'test2';

  wrapper.simulate('keyDown', { keyCode: 32 });

  t.deepEqual(instance.selectedButton, 'test2');
});

test('should move the focus up and down the buttons', (t) => {
  const wrapper = render();
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  wrapper.simulate('keyDown', { keyCode: 40 });

  t.deepEqual(instance.focusedButton, 'test2');

  wrapper.simulate('keyUp');

  wrapper.simulate('keyDown', { keyCode: 38 });

  t.deepEqual(instance.focusedButton, 'test1');

  wrapper.simulate('blur');
});

test('should not update the focusedButton if the target element is the button group', (t) => {
  const wrapper = render();
  const instance = wrapper.instance();

  wrapper.simulate('focus', { target: { id: 'id' } });

  t.deepEqual(instance.focusedButton, null);

  wrapper.simulate('blur', { target: { id: 'id' } });
});

test('should not update the buttons if the key up event hasn\'t happened yet', (t) => {
  const wrapper = render();
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  wrapper.simulate('keyDown', { keyCode: 40 });

  t.deepEqual(instance.focusedButton, 'test2');

  wrapper.simulate('keyDown', { keyCode: 38 });

  t.deepEqual(instance.focusedButton, 'test2');
});
