import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';

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
