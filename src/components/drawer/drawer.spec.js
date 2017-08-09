import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import Drawer from './drawer';

const {
  MainContent,
  DrawerContent,
} = Drawer;

test('should throw an error if no MainContent child is passed', (t) => {
  t.throws(() => shallow(
    <Drawer>
      <div />
    </Drawer>,
  ));
});

test('should throw an error if 2 MainContent children are passed', (t) => {
  t.throws(() => shallow(
    <Drawer>
      <MainContent>Test</MainContent>
      <MainContent>Test</MainContent>
    </Drawer>,
  ));
});

test('should throw an error if no DrawerContent child is passed', (t) => {
  t.throws(() => shallow(
    <Drawer>
      <MainContent>Test</MainContent>
    </Drawer>,
  ));
});

test('should throw an error if 2 DrawerContent children are passed', (t) => {
  t.throws(() => shallow(
    <Drawer>
      <MainContent>Test</MainContent>

      <DrawerContent>Test</DrawerContent>
      <DrawerContent>Test</DrawerContent>
    </Drawer>,
  ));
});

test('should add/remove an resize event listener when the components mounts/unmounts', (t) => {
  const addEventListener = sinon.spy(window, 'addEventListener');
  const removeEventListener = sinon.spy(window, 'removeEventListener');
  const wrapper = shallow(
    <Drawer>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </Drawer>,
  );
  const instance = wrapper.instance();

  instance.componentDidMount();

  t.deepEqual(addEventListener.callCount, 1);

  instance.componentWillUnmount();

  t.deepEqual(removeEventListener.callCount, 1);
});

test('should change the state when the open/close method get\'s called', (t) => {
  const wrapper = shallow(
    <Drawer>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </Drawer>,
  );
  const instance = wrapper.instance();

  instance.open();

  t.deepEqual(wrapper.state('opened'), true);

  instance.close();

  t.deepEqual(wrapper.state('opened'), false);
});

test('should toggle the state when the toggle method get\'s called', (t) => {
  const wrapper = shallow(
    <Drawer>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </Drawer>,
  );
  const instance = wrapper.instance();

  instance.toggle();

  t.deepEqual(wrapper.state('opened'), true);
});

test('should update the narrow state when the window resizes', (t) => {
  const wrapper = shallow(
    <Drawer>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </Drawer>,
  );
  const instance = wrapper.instance();

  instance.handleResize();

  window.innerWidth = Drawer.defaultProps.responsiveWidth - 1;

  instance.handleResize();

  t.deepEqual(wrapper.state('isNarrow'), true);
});

test('should not close the drawer when the prop closeOnBackdropClick is false', (t) => {
  const wrapper = shallow(
    <Drawer closeOnBackdropClick={false}>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </Drawer>,
  );
  const instance = wrapper.instance();

  instance.open();

  instance.handleBackdropPress();

  t.deepEqual(wrapper.state('opened'), true);
});

test('should not close the drawer when the backdrop hasn\'t finished transitioning', (t) => {
  const wrapper = shallow(
    <Drawer closeOnBackdropClick>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </Drawer>,
  );
  const instance = wrapper.instance();

  instance.open();

  instance.handleBackdropPress();

  t.deepEqual(wrapper.state('opened'), true);
});

test('should close the drawer when the backdrop has finished transitioning and is clicked', (t) => {
  const wrapper = shallow(
    <Drawer closeOnBackdropClick>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </Drawer>,
  );
  const instance = wrapper.instance();

  instance.open();

  instance.handleTransitionEnd();

  instance.handleBackdropPress();

  t.deepEqual(wrapper.state('opened'), false);
});
