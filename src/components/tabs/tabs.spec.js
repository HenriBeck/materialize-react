import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { mount } from '../../../tests/helpers/enzyme';
import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

import TabsWrapper, { Tabs } from './tabs';

const props = {
  classes: createClassesFromStyles(Tabs.styles),
  className: '',
  noBar: false,
  createRef: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onKeyPress: () => {},
};

test('should render a Jss hoc', (t) => {
  const wrapper = mount(<TabsWrapper {...props}>Children</TabsWrapper>);

  t.deepEqual(wrapper.find('Jss(Tabs)').length, 1);
});

test('should render an EventHandler as a root', (t) => {
  const createRef = sinon.spy();
  const wrapper = shallow(
    <Tabs
      {...props}
      createRef={createRef}
    >
      Children
    </Tabs>,
  );

  t.deepEqual(wrapper.find('EventHandler').length, 1);
  t.deepEqual(createRef.callCount, 1);
});

test('should set the root prop of the instance', (t) => {
  const wrapper = shallow(<Tabs {...props}>Children</Tabs>);
  const instance = wrapper.instance();

  instance.createRootRef('root');

  t.deepEqual(instance.root, 'root');
});

