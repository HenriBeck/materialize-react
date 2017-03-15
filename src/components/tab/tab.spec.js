import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import is from 'is_js';

import Tab from './tab';
import { mount } from '/tests/helpers/enzyme';

test('should render a div with a span inside and the children inside', (t) => {
  const wrapper = mount(
    <Tab
      id="test"
      active
    >
      Content
    </Tab>,
  );
  const root = wrapper.find({ role: 'tab' });
  const span = root.find('.tab--content');

  t.deepEqual(root.length, 1);
  t.deepEqual(span.length, 1);
  t.deepEqual(span.text(), 'Content');
});

test('should get the position of the tab', (t) => {
  const wrapper = mount(
    <Tab
      id="test"
      active
    >
      Content
    </Tab>,
  );
  const instance = wrapper.instance();

  t.true(is.json(instance.position));
});

test('should update the state when the toggleFocus function is called', (t) => {
  const wrapper = mount(
    <Tab
      id="test"
      active
    >
      Content
    </Tab>,
  );
  const instance = wrapper.instance();

  instance.focus();

  t.deepEqual(wrapper.state('isFocused'), true);

  instance.blur();

  t.deepEqual(wrapper.state('isFocused'), false);
});

test('should update the color of the content if the active prop changes', (t) => {
  const wrapper = mount(
    <Tab
      id="test"
      active
    >
      Content
    </Tab>,
  );
  const instance = wrapper.instance();
  const content = wrapper.find('.tab--content');

  wrapper.setProps({ active: false });

  t.deepEqual(content.node.style.color, instance.getColor(false));
});

test('should call the onPress prop when the tab is clicked', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <Tab
      id="test"
      active
      onPress={onPress}
    >
      Content
    </Tab>,
  );

  wrapper.simulate('mouseDown');

  t.deepEqual(onPress.callCount, 1);

  wrapper.simulate('touchStart');

  t.deepEqual(onPress.callCount, 2);
  t.true(onPress.calledWithExactly('test'));
});

test('should call the event handlers for onMouseDown and onTouchStart if an event happens', (t) => {
  const onTouchStart = sinon.spy();
  const onMouseDown = sinon.spy();
  const wrapper = mount(
    <Tab
      id="test"
      active
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      Content
    </Tab>,
  );

  wrapper.simulate('mouseDown');
  wrapper.simulate('touchStart');

  t.deepEqual(onMouseDown.callCount, 1);
  t.deepEqual(onTouchStart.callCount, 1);
});
