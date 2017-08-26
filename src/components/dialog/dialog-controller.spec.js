import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount } from 'enzyme';

import DialogController from './dialog-controller';

test('should be able to register a dialog container', (t) => {
  const wrapper = mount(<DialogController><div /></DialogController>);
  const instance = wrapper.instance();

  instance.initiateContainer(null, null);

  t.deepEqual(instance.hasController, true);
});

test('should throw an error when we register two containers', (t) => {
  const wrapper = mount(<DialogController><div /></DialogController>);
  const instance = wrapper.instance();

  instance.initiateContainer(null, null);

  t.throws(() => instance.initiateContainer());
});

test('should be able to unregister a container', (t) => {
  const wrapper = mount(<DialogController><div /></DialogController>);
  const instance = wrapper.instance();

  instance.initiateContainer(null, null);

  instance.removeContainer(null, null);

  t.deepEqual(instance.hasController, false);
});

test('should call the openDialog callback when the openDialog method get\'s called', (t) => {
  const wrapper = mount(<DialogController><div /></DialogController>);
  const instance = wrapper.instance();
  const spy = sinon.spy();

  instance.initiateContainer(spy, null);

  instance.openDialog(null);

  t.deepEqual(spy.callCount, 1);
});

test('should throw an error when the openDialog method get\'s called without a container', (t) => {
  const wrapper = mount(<DialogController><div /></DialogController>);
  const instance = wrapper.instance();

  t.throws(() => instance.openDialog(null));
});

test('should call the closeDialog callback when the openDialog method get\'s called', (t) => {
  const wrapper = mount(<DialogController><div /></DialogController>);
  const instance = wrapper.instance();
  const spy = sinon.spy();

  instance.initiateContainer(null, spy);

  instance.closeDialog();

  t.deepEqual(spy.callCount, 1);
});

test('should throw an error when the closeDialog method get\'s called without a container', (t) => {
  const wrapper = mount(<DialogController><div /></DialogController>);
  const instance = wrapper.instance();

  t.throws(() => instance.closeDialog());
});

