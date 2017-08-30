import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Tab from '../tab';

import Tabs from './tabs';

/**
 * A function that will render a set of tabs.
 *
 * @param {Object} props - Additional props for the tabs component.
 * @returns {Object} - Returns the testing instance from enzyme.
 */
function renderTabs(props) {
  const wrapper = shallow(
    <Tabs
      initialTab="test1"
      {...props}
    >
      <Tab name="test1" />
      <Tab name="test2" />
    </Tabs>,
  );
  const instance = wrapper.instance();

  instance.createRef({
    root: { getBoundingClientRect() { return {}; } },
    bar: { style: {} },
  });

  const elem = {
    getBoundingClientRect() {
      return {};
    },
  };

  instance.createRefToTab('test1')(elem);
  instance.createRefToTab('test2')(elem);

  return wrapper;
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

test('should render a TabsContainer', (t) => {
  const wrapper = renderTabs();

  t.deepEqual(wrapper.find('Jss(TabsContainer)').length, 1);
});

test('should animate the bar to the initial tab', (t) => {
  const wrapper = renderTabs();
  const instance = wrapper.instance();
  const animateBarSpy = sinon.spy();

  instance.animateBar = animateBarSpy;

  instance.componentDidMount();

  t.true(animateBarSpy.calledOnce);
});

test('should get the currently selected tab with the currentTab property', (t) => {
  const wrapper = renderTabs();
  const instance = wrapper.instance();

  t.deepEqual(instance.currentTab, 'test1');
});

test('should change the state when we set the currentTab', (t) => {
  const wrapper = renderTabs();
  const instance = wrapper.instance();
  const animateBarSpy = sinon.spy();

  instance.animateBar = animateBarSpy;

  instance.currentTab = 'test1';
  instance.currentTab = 'test2';

  t.true(animateBarSpy.calledOnce);
});

test('should change the state when the handlePress function get\'s called', (t) => {
  const wrapper = renderTabs();
  const instance = wrapper.instance();

  instance.handlePress('test2')();

  t.deepEqual(wrapper.state(), {
    focusedTab: 'test2',
    selectedTab: 'test2',
  });
});

test('should not animate the bar when the noBar prop is passed', (t) => {
  const wrapper = renderTabs({ noBar: true });
  const instance = wrapper.instance();
  const animateBarSpy = sinon.spy();

  instance.animateBar = animateBarSpy;

  instance.componentDidMount();

  instance.currentTab = 'test2';

  t.deepEqual(animateBarSpy.callCount, 0);
});

test('should set the focusedTab to the selectedTab when the tab list get\'s focused', (t) => {
  const wrapper = renderTabs();

  wrapper.simulate('focus');

  t.deepEqual(wrapper.state('focusedTab'), wrapper.state('selectedTab'));
});

test('should set the focusedTab back to null when the tab list loses focus', (t) => {
  const wrapper = renderTabs();

  wrapper.simulate('focus');
  wrapper.simulate('blur');

  t.deepEqual(wrapper.state('focusedTab'), null);
});

test('should not change the selected tab when the focused Tab is the same as the selected', (t) => {
  const wrapper = renderTabs();
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  instance.setState = sinon.spy();

  instance.handleKeyPress({ keyCode: Tabs.switchOnKeyCodes[0] });

  t.deepEqual(instance.setState.callCount, 0);
});

test('should change the selected tab when the focused Tab is not the same as the selected', (t) => {
  const wrapper = renderTabs();
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  wrapper.setState({ focusedTab: 'test2' });

  instance.handleKeyPress({ keyCode: Tabs.switchOnKeyCodes[0] });

  t.deepEqual(wrapper.state('selectedTab'), wrapper.state('focusedTab'));
});

test('should change the focused tab when the left arrow key is pressed', (t) => {
  const wrapper = renderTabs();
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  instance.handleKeyPress({ keyCode: 37 });

  t.deepEqual(wrapper.state('focusedTab'), 'test2');
});
