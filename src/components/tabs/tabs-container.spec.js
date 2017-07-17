import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import TabsContainerWrapper, { TabsContainer } from './tabs-container';
import { shallow } from '../../../tests/helpers/enzyme';

const props = {
  classes: {},
  className: '',
  noBar: false,
  createRef: sinon.spy(),
  onFocus: () => {},
  onBlur: () => {},
  onKeyPress: () => {},
};

test('should render a Jss hoc', (t) => {
  const wrapper = shallow(<TabsContainerWrapper {...props}>Children</TabsContainerWrapper>);
  const jssContainer = wrapper.find('Jss(TabsContainer)');

  t.deepEqual(jssContainer.length, 1);
  t.deepEqual(jssContainer.dive().find('TabsContainer').length, 1);
});

test('should render an EventHandler as a root', (t) => {
  const wrapper = shallow(<TabsContainer {...props}>Children</TabsContainer>);

  t.deepEqual(wrapper.find('EventHandler').length, 1);
  t.deepEqual(props.createRef.callCount, 1);
});

test('should set the root prop of the instance', (t) => {
  const wrapper = shallow(<TabsContainer {...props}>Children</TabsContainer>);
  const instance = wrapper.instance();

  instance.createRootRef('root');

  t.deepEqual(instance.root, 'root');
});

test('should set the bar prop of the instance', (t) => {
  const wrapper = shallow(<TabsContainer {...props}>Children</TabsContainer>);
  const instance = wrapper.instance();
  const eventHandler = wrapper.find('EventHandler').dive();

  eventHandler.find('span').node.ref('bar');

  t.deepEqual(instance.bar, 'bar');
});
