import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount } from 'enzyme';

import RadioButtonGroup from './radio-button-group';

test('should render a Layout component', (t) => {
  const wrapper = mount(
    <RadioButtonGroup selected="test1">
      <div />
    </RadioButtonGroup>,
  );

  t.deepEqual(wrapper.find('Jss(Layout)').length, 1);
});

test('should update the broadcast when the selected prop changes', (t) => {
  const wrapper = mount(
    <RadioButtonGroup selected="test1">
      <div />
    </RadioButtonGroup>,
  );
  const instance = wrapper.instance();

  wrapper.setProps({ selected: 'test2' });

  t.deepEqual(instance.broadcast.getState(), 'test2');
});

test('should not update the broadcast when the selected didn\'t changes', (t) => {
  const wrapper = mount(
    <RadioButtonGroup selected="test1">
      <div />
    </RadioButtonGroup>,
  );
  const instance = wrapper.instance();
  const spy = sinon.spy(instance.broadcast, 'setState');

  wrapper.setProps({ className: 'test' });

  t.deepEqual(spy.callCount, 0);
});
