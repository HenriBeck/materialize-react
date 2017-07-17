import React from 'react';
import test from 'ava';
import {
  shallow,
  mount,
} from 'enzyme';
import sinon from 'sinon';

import Tabs from './tabs';
import Tab from '../tab';

/**
 * A function that will render a set of tabs.
 *
 * @param {Function} renderFunc - The function that will be called with the tabs.
 * Either shallow or mount.
 * @param {Object} props - Additional props for the tabs component.
 * @returns {Object} - Returns the testing instance from enzyme.
 */
function renderTabs(renderFunc, props) {
  return renderFunc(
    <Tabs
      initialTab="test1"
      {...props}
    >
      <Tab name="test1" />
      <Tab name="test2" />
    </Tabs>,
  );
}

test('should throw an error if we pass an other component than a Tab component', (t) => {
  t.throws(() => shallow(
    <Tabs initialTab="test">
      <div />
    </Tabs>,
  ));
});

test('should throw an error if we pass only pass one Tab component', (t) => {
  t.throws(() => shallow(
    <Tabs initialTab="test">
      <Tab />
    </Tabs>,
  ));
});

test('should throw an error if we pass the same name to a Tab twice', (t) => {
  t.throws(() => shallow(
    <Tabs initialTab="test1">
      <Tab name="test1" />
      <Tab name="test1" />
    </Tabs>,
  ));
});

test('should throw an error if we the initialTab does not map to one of the Tab children', (t) => {
  t.throws(() => shallow(
    <Tabs initialTab="test">
      <Tab name="test1" />
      <Tab name="test2" />
    </Tabs>,
  ));
});

test('should get the currently selected tab with the currentTab property', (t) => {
  const wrapper = renderTabs(shallow);
  const instance = wrapper.instance();

  t.deepEqual(instance.currentTab, 'test1');
});

test('should change the state when with currentTab property', (t) => {
  const wrapper = renderTabs(mount);
  const instance = wrapper.instance();

  instance.currentTab = 'test1';
  instance.currentTab = 'test2';

  t.deepEqual(wrapper.state('selectedTab'), 'test2');
});

test('should set the focusedTab state when the component receives focus', (t) => {
  const wrapper = renderTabs(shallow);

  wrapper.simulate('focus');

  t.deepEqual(wrapper.state('focusedTab'), wrapper.state('selectedTab'));
});

test('should set the focusedTab state back to null the component looses focus', (t) => {
  const wrapper = renderTabs(shallow);

  wrapper.simulate('focus');
  wrapper.simulate('blur');

  t.deepEqual(wrapper.state('focusedTab'), null);
});

test('should change the state when the handlePress function get\'s called', (t) => {
  const wrapper = renderTabs(mount);
  const instance = wrapper.instance();

  instance.handlePress('test2')();

  t.deepEqual(wrapper.state(), {
    selectedTab: 'test2',
    focusedTab: 'test2',
  });
});

test('should not animate the bar when the noBar prop is passed', (t) => {
  const wrapper = renderTabs(shallow, { noBar: true });
  const instance = wrapper.instance();
  const animateBar = sinon.spy();

  instance.animateBar = animateBar;

  instance.componentDidMount();

  t.deepEqual(animateBar.callCount, 0);
});

test('should not call onChange when Enter is pressed and the state does no change', (t) => {
  const onChange = sinon.spy();
  const wrapper = renderTabs(mount, { onChange });
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  instance.handleKeyPress({ keyCode: Tabs.switchOnKeyCodes[0] });

  t.deepEqual(onChange.callCount, 0);
});

test('should call onChange when Enter is pressed and the state changes', (t) => {
  const onChange = sinon.spy();
  const wrapper = renderTabs(mount, { onChange });
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  wrapper.setState({ focusedTab: 'test2' });

  instance.handleKeyPress({ keyCode: Tabs.switchOnKeyCodes[0] });

  t.deepEqual(onChange.callCount, 1);
});

test('should move the focusedTab when the left arrow key is pressed', (t) => {
  const wrapper = renderTabs(shallow);
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  instance.handleKeyPress({ keyCode: 39 });

  t.deepEqual(wrapper.state('focusedTab'), 'test2');
});
