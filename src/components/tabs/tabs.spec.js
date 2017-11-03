import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { mount } from '../../../tests/helpers/enzyme';
import Tab from '../tab';

import TabsWrapper, { Tabs } from './tabs';

test('should throw an error if a non Tab child is passed', (t) => {
  t.throws(() => shallow(
    <Tabs tab="1">
      <div />
    </Tabs>,
  ));
});

test('should throw an error if only one tab is passed', (t) => {
  t.throws(() => shallow(
    <Tabs tab="1">
      <Tab name="1">Test</Tab>
    </Tabs>,
  ));
});

test('should throw an error if two tabs with the same names are passed', (t) => {
  t.throws(() => shallow(
    <Tabs tab="1">
      <Tab name="1">Test</Tab>
      <Tab name="1">Test</Tab>
    </Tabs>,
  ));
});

test('should render a div with the role of tablist', (t) => {
  const wrapper = mount(
    <TabsWrapper tab="1">
      <Tab name="1">Tab 1</Tab>
      <Tab name="2">Tab 2</Tab>
    </TabsWrapper>,
  );

  t.deepEqual(wrapper.find('div[role="tablist"]').length, 1);
});

test('should not render a bar when the noBar prop is passed', (t) => {
  const wrapper = mount(
    <TabsWrapper
      noBar
      tab="1"
    >
      <Tab name="1">Tab 1</Tab>
      <Tab name="2">Tab 2</Tab>
    </TabsWrapper>,
  );

  t.deepEqual(wrapper.find('.tabs--bar').length, 0);
});

test('should call the animateBar function when the tab prop changes', (t) => {
  const wrapper = mount(
    <TabsWrapper tab="1">
      <Tab name="1">Tab 1</Tab>
      <Tab name="2">Tab 2</Tab>
    </TabsWrapper>,
  );
  const instance = wrapper.find('Tabs').instance();
  const spy = sinon.spy(instance, 'animateBar');

  wrapper.setProps({ tab: '2' });

  t.deepEqual(spy.callCount, 1);

  wrapper.setProps({ noBar: true });

  t.deepEqual(spy.callCount, 1);
});

test('should add a resize event listener on mount', (t) => {
  const spy = sinon.spy(window, 'addEventListener');

  mount(
    <TabsWrapper tab="1">
      <Tab name="1">Tab 1</Tab>
      <Tab name="2">Tab 2</Tab>
    </TabsWrapper>,
  );

  t.deepEqual(
    spy
      .getCalls()
      .filter(call => call.args[0] === 'resize')
      .length,
    1,
  );

  window.addEventListener.restore();
});

test('should remove the resize event listener on unmount', (t) => {
  const spy = sinon.spy(window, 'removeEventListener');
  const wrapper = mount(
    <TabsWrapper tab="1">
      <Tab name="1">Tab 1</Tab>
      <Tab name="2">Tab 2</Tab>
    </TabsWrapper>,
  );

  wrapper.unmount();

  t.deepEqual(
    spy
      .getCalls()
      .filter(call => call.args[0] === 'resize')
      .length,
    1,
  );

  window.removeEventListener.restore();
});

test('should call the onChange handler when a tab get\'s pressed', (t) => {
  const onChange = sinon.spy();
  const wrapper = mount(
    <TabsWrapper
      tab="1"
      onChange={onChange}
    >
      <Tab name="1">Tab 1</Tab>
      <Tab name="2">Tab 2</Tab>
    </TabsWrapper>,
  );

  wrapper
    .find('Tab[name="2"]')
    .prop('onPress')();

  t.deepEqual(onChange.callCount, 1);
});

test('should set the isFocused state to true when the tablist receives focus', (t) => {
  const wrapper = mount(
    <TabsWrapper tab="1">
      <Tab name="1">Tab 1</Tab>
      <Tab name="2">Tab 2</Tab>
    </TabsWrapper>,
  );
  const div = wrapper.find('div[role="tablist"]');

  div.simulate('focus');

  t.deepEqual(
    wrapper
      .find('Tab[name="1"]')
      .prop('focused'),
    true,
  );
});

test('should set the isFocused state to false when the tablist looses focus', (t) => {
  const wrapper = mount(
    <TabsWrapper tab="1">
      <Tab name="1">Tab 1</Tab>
      <Tab name="2">Tab 2</Tab>
    </TabsWrapper>,
  );
  const div = wrapper.find('div[role="tablist"]');

  div.simulate('focus');

  div.simulate('blur');

  t.deepEqual(
    wrapper
      .find('Tab[name="1"]')
      .prop('focused'),
    false,
  );
});

test('should call the onChange prop', (t) => {
  const wrapper = mount(
    <TabsWrapper tab="1">
      <Tab name="1">Tab 1</Tab>
      <Tab name="2">Tab 2</Tab>
    </TabsWrapper>,
  );
  const props = wrapper
    .find('EventHandler[role="tablist"]')
    .props();

  props.onFocus();

  props.onKeyPress({ keyCode: 39 });

  const instance = wrapper.find('Tabs').instance();

  t.deepEqual(instance.state.focusedTab, '2');
});

test('should call the d prop', (t) => {
  const onChange = sinon.spy();
  const wrapper = mount(
    <TabsWrapper
      tab="1"
      onChange={onChange}
    >
      <Tab name="1">Tab 1</Tab>
      <Tab name="2">Tab 2</Tab>
    </TabsWrapper>,
  );
  const props = wrapper
    .find('EventHandler[role="tablist"]')
    .props();

  props.onFocus();

  props.onKeyPress({ keyCode: Tabs.switchOnKeyCodes[0] });

  t.deepEqual(onChange.callCount, 1);
});
