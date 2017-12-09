import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import { mount } from '../../../tests/helpers/enzyme';

import Drawer from './drawer';

test('should not call onNarrowChange when the narrow state doesn\'t change', (t) => {
  const onNarrowChange = sinon.spy();
  const wrapper = mount(
    <Drawer
      open
      onNarrowChange={onNarrowChange}
    >
      <Drawer.MainContent>Test</Drawer.MainContent>

      <Drawer.DrawerContent>Test</Drawer.DrawerContent>
    </Drawer>,
  );
  const onResize = wrapper.find('EventListener').prop('onResize');

  onResize();

  t.deepEqual(onNarrowChange.callCount, 0);
});

test('should call onNarrowChange when the narrow state changes', (t) => {
  const onNarrowChange = sinon.spy();
  const wrapper = mount(
    <Drawer
      open
      onNarrowChange={onNarrowChange}
    >
      <Drawer.MainContent>Test</Drawer.MainContent>

      <Drawer.DrawerContent>Test</Drawer.DrawerContent>
    </Drawer>,
  );
  const onResize = wrapper.find('EventListener').prop('onResize');

  window.innerWidth = -1;

  onResize();

  t.deepEqual(onNarrowChange.callCount, 1);
});

test('should call onCloseRequest when the backdrop is clicked', (t) => {
  const onCloseRequest = sinon.spy();
  const wrapper = mount(
    <Drawer
      open
      onCloseRequest={onCloseRequest}
    >
      <Drawer.MainContent>Test</Drawer.MainContent>

      <Drawer.DrawerContent>Test</Drawer.DrawerContent>
    </Drawer>,
  );

  wrapper
    .find('Backdrop')
    .simulate('click');

  t.deepEqual(onCloseRequest.callCount, 1);
});

test('should not call onCloseRequest when the drawer is transitioning', (t) => {
  const onCloseRequest = sinon.spy();
  const wrapper = mount(
    <Drawer
      open
      onCloseRequest={onCloseRequest}
    >
      <Drawer.MainContent>Test</Drawer.MainContent>

      <Drawer.DrawerContent>Test</Drawer.DrawerContent>
    </Drawer>,
  );

  wrapper.setProps({ open: false });

  wrapper.setProps({ className: 'some' });

  wrapper.find('Backdrop').simulate('click');

  t.deepEqual(onCloseRequest.callCount, 0);
});

test('should reset after animation has finished', (t) => {
  const onCloseRequest = sinon.spy();
  const wrapper = mount(
    <Drawer
      open={false}
      onCloseRequest={onCloseRequest}
    >
      <Drawer.MainContent>Test</Drawer.MainContent>

      <Drawer.DrawerContent>Test</Drawer.DrawerContent>
    </Drawer>,
  );

  wrapper.setProps({ open: true });

  wrapper.find('Backdrop').simulate('animationEnd');

  wrapper.find('Backdrop').simulate('click');

  t.deepEqual(onCloseRequest.callCount, 1);
});

