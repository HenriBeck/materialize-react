import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import TabsContainerWrapper, { TabsContainer } from './tabs-container';
import { mount } from '../../../tests/helpers/enzyme';
import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

const props = {
  classes: createClassesFromStyles(TabsContainer.styles()),
  className: '',
  noBar: false,
  createRef: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onKeyPress: () => {},
};

test('should render a Jss hoc', (t) => {
  const wrapper = mount(<TabsContainerWrapper {...props}>Children</TabsContainerWrapper>);

  t.deepEqual(wrapper.find('Jss(TabsContainer)').length, 1);
});

test('should render an EventHandler as a root', (t) => {
  const createRef = sinon.spy();
  const wrapper = shallow(
    <TabsContainer
      {...props}
      createRef={createRef}
    >
      Children
    </TabsContainer>,
  );

  t.deepEqual(wrapper.find('EventHandler').length, 1);
  t.deepEqual(createRef.callCount, 1);
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
