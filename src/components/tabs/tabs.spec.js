import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import { mount } from '../../../tests/helpers/enzyme';
import Tab from '../tab';

import Tabs from './tabs';

test('should render a tablist', (t) => {
  const wrapper = mount(
    <Tabs tab="test1">
      <Tab name="test1" />
      <Tab name="test2" />
    </Tabs>,
  );

  t.deepEqual(wrapper.find('[role="tablist"]').length, 1);
});

test('should call onChange when a tab is clicked', (t) => {
  const onChange = sinon.spy();
  const wrapper = mount(
    <Tabs
      tab="test1"
      onChange={onChange}
    >
      <Tab name="test1" />
      <Tab name="test2" />
    </Tabs>,
  );

  wrapper
    .find('Tab[name="test2"]')
    .simulate('click');

  t.deepEqual(onChange.callCount, 1);
});

test('should have no bar when the noBar prop is passed', (t) => {
  const wrapper = mount(
    <Tabs
      noBar
      tab="test1"
    >
      <Tab name="test1" />
      <Tab name="test2" />
    </Tabs>,
  );

  t.deepEqual(wrapper.find('.tabs--bar').length, 0);
});

test('should update the aria-selected attribute when the tab prop changes', (t) => {
  const wrapper = mount(
    <Tabs tab="test1">
      <Tab name="test1" />
      <Tab name="test2" />
    </Tabs>,
  );

  wrapper.setProps({ tab: 'test2' });

  t.deepEqual(
    wrapper
      .find('Tab[name="test2"]')
      .prop('selected'),
    true,
  );
});

test('should update the focusedTab when the tab prop changes and the tabs are focused', (t) => {
  const wrapper = mount(
    <Tabs tab="test1">
      <Tab name="test1" />
      <Tab name="test2" />
    </Tabs>,
  );

  wrapper
    .find('[role="tablist"]')
    .simulate('focus');

  wrapper.setProps({ tab: 'test2' });

  t.deepEqual(
    wrapper
      .find('Tab[name="test2"]')
      .prop('focused'),
    true,
  );
});

test('should set the focusedTab to null when the component get\'s blurred', (t) => {
  const wrapper = mount(
    <Tabs tab="test1">
      <Tab name="test1" />
      <Tab name="test2" />
    </Tabs>,
  );

  wrapper
    .find('[role="tablist"]')
    .simulate('focus');

  wrapper
    .find('[role="tablist"]')
    .simulate('blur');

  t.deepEqual(wrapper.find({ focused: true }).length, 0);
});

test('should call onChange when the spacebar is pressed', (t) => {
  const onChange = sinon.spy();
  const wrapper = mount(
    <Tabs
      tab="test1"
      onChange={onChange}
    >
      <Tab name="test1" />
      <Tab name="test2" />
    </Tabs>,
  );

  wrapper
    .find('[role="tablist"]')
    .simulate('focus');

  wrapper
    .find('[role="tablist"]')
    .simulate('keyDown', { keyCode: 13 });

  t.deepEqual(onChange.callCount, 1);
});

test('should move the focused tab when the right arrow key is pressed', (t) => {
  const wrapper = mount(
    <Tabs tab="test1">
      <Tab name="test1" />
      <Tab name="test2" />
    </Tabs>,
  );

  wrapper
    .find('[role="tablist"]')
    .simulate('focus');

  wrapper
    .find('[role="tablist"]')
    .simulate('keyDown', { keyCode: 39 });

  t.deepEqual(
    wrapper
      .find('Tab[name="test2"]')
      .prop('focused'),
    true,
  );
});
