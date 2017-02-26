import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import Tabs from './tabs.jsx';
import Tab from '../tab';
import { mount } from 'tests/enzyme';

function render(props) {
  return mount(
    <Tabs
      initialTabId="test1"
      {...props}
    >
      <Tab id="test1">Test 1</Tab>
      <Tab id="test2">Test 2</Tab>
    </Tabs>,
  );
}

test('should throw an error if only one child is passed', (t) => {
  t.throws(() => (
    <Tabs initialTabId="tab1">
      <div />
    </Tabs>
  ));
});

test('should throw an error if a children is not a tab', (t) => {
  t.throws(() => (
    <Tabs initialTabId="tab1">
      <div />
      <div />
    </Tabs>
  ));
});

test('should have a bar inside', (t) => {
  const wrapper = render();
  const bar = wrapper.find('.tabs--bar');

  t.deepEqual(bar.length, 1);
});

test('should not have a bar inside if the noBar prop is true', (t) => {
  const wrapper = render({ noBar: true });
  const bar = wrapper.find('.tabs--bar');

  t.deepEqual(bar.length, 0);
});

test('should not update anything if the tab changes but there is no bar', (t) => {
  const wrapper = render({ noBar: true });
  const instance = wrapper.instance();

  instance.handleTabChanged('test2');

  t.deepEqual(wrapper.state('selectedTab'), 'test2');
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

  wrapper.simulate('focus');

  wrapper.simulate('keyDown', { keyCode: 32 });

  t.deepEqual(wrapper.state('selectedTab'), 'test1');
});

test('should update the buttons if the active button is not the same as the selected', (t) => {
  const wrapper = render();
  const instance = wrapper.instance();

  instance.focusedTab = 'test2';

  wrapper.simulate('keyDown', { keyCode: 32 });

  t.deepEqual(wrapper.state('selectedTab'), 'test2');
});

test('should move the focus up and down the buttons', (t) => {
  const wrapper = render();
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  wrapper.simulate('keyDown', { keyCode: 39 });

  t.deepEqual(instance.focusedTab, 'test2');

  wrapper.simulate('keyUp');

  wrapper.simulate('keyDown', { keyCode: 37 });

  t.deepEqual(instance.focusedTab, 'test1');

  wrapper.simulate('blur');
});

test('should not update the buttons if the key up event hasn\'t happened yet', (t) => {
  const wrapper = render();
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  wrapper.simulate('keyDown', { keyCode: 39 });

  t.deepEqual(instance.focusedTab, 'test2');

  wrapper.simulate('keyDown', { keyCode: 37 });

  t.deepEqual(instance.focusedTab, 'test2');
});
