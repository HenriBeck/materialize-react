import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import { mount } from 'tests/enzyme';
import RadioButtonGroup from './radio-button-group.jsx';
import RadioButton from '../radio-button';

test('should render a div with a role of radiogroup', (t) => {
  const wrapper = mount(
    <RadioButtonGroup name="test">
      <RadioButton name="test" />
      <RadioButton name="test" />
    </RadioButtonGroup>,
  );

  t.deepEqual(wrapper.find({ role: 'radiogroup' }).length, 1);
});

test('should throw an error if only one or less RadioButton\'s are passed', (t) => {
  const wrapper = () => mount(
    <RadioButtonGroup name="test">
      <RadioButton name="test" />
    </RadioButtonGroup>,
  );

  t.throws(wrapper);
});

test('should render other children than RadioButton\'s aswell', (t) => {
  const children = <div>Content</div>;
  const wrapper = mount(
    <RadioButtonGroup name="test">
      <RadioButton name="test" />
      <RadioButton name="test" />
      {children}
    </RadioButtonGroup>,
  );

  t.true(wrapper.contains(children));
});

test('should update the group when a radio button is changed', (t) => {
  const wrapper = mount(
    <RadioButtonGroup
      name="test"
      defaultSelected="test2"
    >
      <RadioButton name="test1" />
      <RadioButton name="test2" />
    </RadioButtonGroup>,
  );
  const instance = wrapper.instance();
  const radioButton = wrapper
    .find('RadioButton')
    .first()
    .find('.radio-button--container');

  radioButton.simulate('mouseDown');

  t.deepEqual(instance.activeButton, 'test1');
});

test('should not call the onChange function when the handleChange function is', (t) => {
  const onChange = sinon.spy();
  const wrapper = mount(
    <RadioButtonGroup
      name="test"
      onChange={onChange}
    >
      <RadioButton name="test1" />
      <RadioButton name="test2" />
    </RadioButtonGroup>,
  );
  const instance = wrapper.instance();

  instance.handleChange('test2', false);
  instance.handleChange('test1', true);

  t.deepEqual(onChange.callCount, 1);
  t.true(onChange.calledWith('test', 'test1'));
});
