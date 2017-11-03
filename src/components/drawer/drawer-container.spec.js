import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import DrawerContainer from './drawer-container';

const {
  MainContent,
  DrawerContent,
} = DrawerContainer;

test('should throw an error if no MainContent child is passed', (t) => {
  t.throws(() => shallow(
    <DrawerContainer>
      <div />
    </DrawerContainer>,
  ));
});

test('should throw an error if 2 MainContent children are passed', (t) => {
  t.throws(() => shallow(
    <DrawerContainer>
      <MainContent>Test</MainContent>
      <MainContent>Test</MainContent>
    </DrawerContainer>,
  ));
});

test('should throw an error if no DrawerContent child is passed', (t) => {
  t.throws(() => shallow(
    <DrawerContainer>
      <MainContent>Test</MainContent>
    </DrawerContainer>,
  ));
});

test('should throw an error if 2 DrawerContent children are passed', (t) => {
  t.throws(() => shallow(
    <DrawerContainer>
      <MainContent>Test</MainContent>

      <DrawerContent>Test</DrawerContent>
      <DrawerContent>Test</DrawerContent>
    </DrawerContainer>,
  ));
});

test('should add/remove an resize event listener when the components mounts/unmounts', (t) => {
  const addEventListener = sinon.spy(window, 'addEventListener');
  const removeEventListener = sinon.spy(window, 'removeEventListener');
  const wrapper = shallow(
    <DrawerContainer>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </DrawerContainer>,
  );

  t.deepEqual(addEventListener.callCount, 1);

  wrapper.unmount();

  t.deepEqual(removeEventListener.callCount, 1);

  window.addEventListener.restore();
  window.removeEventListener.restore();
});

test('should change the state when the open/close method get\'s called', (t) => {
  const wrapper = shallow(
    <DrawerContainer>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </DrawerContainer>,
  );
  const instance = wrapper.instance();

  instance.open();

  t.deepEqual(wrapper.state('opened'), true);

  instance.handleTransitionEnd();

  instance.close();

  t.deepEqual(wrapper.state('opened'), false);
});

test('should toggle the state when the toggle method get\'s called', (t) => {
  const wrapper = shallow(
    <DrawerContainer>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </DrawerContainer>,
  );
  const instance = wrapper.instance();

  instance.toggle();

  t.deepEqual(wrapper.state('opened'), true);
});

test('should update the narrow state when the window resizes', (t) => {
  const wrapper = shallow(
    <DrawerContainer>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </DrawerContainer>,
  );
  const instance = wrapper.instance();

  instance.handleResize();

  window.innerWidth = DrawerContainer.defaultProps.responsiveWidth - 1;

  instance.handleResize();

  t.deepEqual(wrapper.state('isNarrow'), true);
});

test('should not close the drawer when the prop closeOnBackdropClick is false', (t) => {
  const wrapper = shallow(
    <DrawerContainer closeOnBackdropClick={false}>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </DrawerContainer>,
  );
  const instance = wrapper.instance();

  instance.open();

  instance.handleBackdropPress();

  t.deepEqual(wrapper.state('opened'), true);
});

test('should not close the drawer when the backdrop hasn\'t finished transitioning', (t) => {
  const wrapper = shallow(
    <DrawerContainer closeOnBackdropClick>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </DrawerContainer>,
  );
  const instance = wrapper.instance();

  instance.open();

  instance.handleBackdropPress();

  t.deepEqual(wrapper.state('opened'), true);
});

test('should close the drawer when the backdrop has finished transitioning and is clicked', (t) => {
  const wrapper = shallow(
    <DrawerContainer closeOnBackdropClick>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </DrawerContainer>,
  );
  const instance = wrapper.instance();

  instance.open();

  instance.handleTransitionEnd();

  instance.handleBackdropPress();

  t.deepEqual(wrapper.state('opened'), false);
});

test('should not close the drawer when the drawer is still opening', (t) => {
  const wrapper = shallow(
    <DrawerContainer closeOnBackdropClick>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </DrawerContainer>,
  );
  const instance = wrapper.instance();

  instance.open();

  instance.close();

  t.deepEqual(wrapper.state('opened'), true);
});

test('should not open the drawer when the drawer is still closing', (t) => {
  const wrapper = shallow(
    <DrawerContainer closeOnBackdropClick>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </DrawerContainer>,
  );
  const instance = wrapper.instance();

  instance.open();

  instance.handleTransitionEnd();

  instance.close();

  instance.open();

  t.deepEqual(wrapper.state('opened'), false);
});

test('should not toggle the drawer when the animation hasn\'t finished', (t) => {
  const wrapper = shallow(
    <DrawerContainer closeOnBackdropClick>
      <MainContent>Test</MainContent>
      <DrawerContent>Test</DrawerContent>
    </DrawerContainer>,
  );
  const instance = wrapper.instance();

  instance.open();

  instance.toggle();

  t.deepEqual(wrapper.state('opened'), true);
});
