import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import is from 'is_js';
import { shallow } from 'enzyme';

import Tab from '../tab';

import TabsContainer from './tabs-container';

/**
 * A function that will render a set of tabs.
 *
 * @param {Object} props - Additional props for the tabs component.
 * @returns {Object} - Returns the testing instance from enzyme.
 */
function renderTabs(props) {
  const wrapper = shallow(
    <TabsContainer
      initialTab="test1"
      {...props}
    >
      <Tab name="test1" />
      <Tab name="test2" />
    </TabsContainer>,
    { disableLifecycleMethods: true },
  );
  const instance = wrapper.instance();
  const elem = {
    getBoundingClientRect() {
      return {};
    },
  };

  instance.createRef({
    root: elem,
    bar: { style: {} },
  });

  instance.createRefToTab('test1')(elem);
  instance.createRefToTab('test2')(elem);

  return wrapper;
}

test('should throw an error if we pass an other component than a Tab component', (t) => {
  t.throws(() => shallow(
    <TabsContainer initialTab="test">
      <div />
    </TabsContainer>,
  ));
});

test('should throw an error if we pass only pass one Tab component', (t) => {
  t.throws(() => shallow(
    <TabsContainer initialTab="test">
      <Tab />
    </TabsContainer>,
  ));
});

test('should throw an error if we pass the same name to a Tab twice', (t) => {
  t.throws(() => shallow(
    <TabsContainer initialTab="test1">
      <Tab name="test1" />
      <Tab name="test1" />
    </TabsContainer>,
  ));
});

test('should throw an error if we the initialTab does not map to one of the Tab children', (t) => {
  t.throws(() => shallow(
    <TabsContainer initialTab="test">
      <Tab name="test1" />
      <Tab name="test2" />
    </TabsContainer>,
  ));
});

test('should render a TabsContainer', (t) => {
  const wrapper = renderTabs();

  t.deepEqual(wrapper.find('Jss(Tabs)').length, 1);
});

test('should add a resize event listener on mount', (t) => {
  const addEventListener = sinon.spy(window, 'addEventListener');

  renderTabs();

  t.deepEqual(addEventListener.callCount, 1);
});

test('should remove a resize event listener when the component unmounts', (t) => {
  const removeEventListener = sinon.spy(window, 'removeEventListener');

  const wrapper = renderTabs();

  wrapper.unmount();

  t.deepEqual(removeEventListener.callCount, 1);
});

test('should call animateBar when the resize event handler is called', (t) => {
  const wrapper = renderTabs();
  const instance = wrapper.instance();

  instance.animateBar = sinon.spy();

  instance.handleResize();

  t.deepEqual(instance.animateBar.callCount, 1);
});

test('should initially set the bar styles on mount', (t) => {
  const wrapper = renderTabs();
  const instance = wrapper.instance();

  instance.componentDidMount();

  t.true(is.string(instance.container.bar.style.transform));
});

test('should get the currently selected tab with the currentTab property', (t) => {
  const wrapper = renderTabs();
  const instance = wrapper.instance();

  t.deepEqual(instance.currentTab, 'test1');
});

test('should change the state with the currentTab', (t) => {
  const wrapper = renderTabs();
  const instance = wrapper.instance();

  instance.currentTab = 'test2';

  t.deepEqual(wrapper.state('selectedTab'), 'test2');
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

  instance.componentDidMount();

  t.true(is.undefined(instance.container.bar.style.transform));
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

test('should change the selected tab when the focused Tab is not the same as the selected', (t) => {
  const wrapper = renderTabs();
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  wrapper.setState({ focusedTab: 'test2' });

  instance.handleKeyPress({ keyCode: TabsContainer.switchOnKeyCodes[0] });

  t.deepEqual(wrapper.state('selectedTab'), wrapper.state('focusedTab'));
});

test('should change the focused tab when the left arrow key is pressed', (t) => {
  const wrapper = renderTabs();
  const instance = wrapper.instance();

  wrapper.simulate('focus');

  instance.handleKeyPress({ keyCode: 37 });

  t.deepEqual(wrapper.state('focusedTab'), 'test2');
});
