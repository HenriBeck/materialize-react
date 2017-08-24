import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';
import sinon from 'sinon';

import SnackbarController from './snackbar-controller';

test('should be able to initiate a new snackbar container', (t) => {
  const wrapper = mount(<SnackbarController><div /></SnackbarController>);
  const instance = wrapper.instance();

  instance.initiateContainer();

  t.deepEqual(instance.hasController, true);
});

test('should throw an error if two containers try to initiate them', (t) => {
  const wrapper = mount(<SnackbarController><div /></SnackbarController>);
  const instance = wrapper.instance();

  instance.initiateContainer();

  t.throws(() => instance.initiateContainer());
});

test('should call the addSnackbarCallback when the addSnackbar method get\'s called', (t) => {
  const spy = sinon.spy();
  const wrapper = mount(<SnackbarController><div /></SnackbarController>);
  const instance = wrapper.instance();

  instance.initiateContainer(spy);

  instance.addSnackbar();

  t.deepEqual(spy.callCount, 1);
});

test('should throw an error when addSnackbar is called without an registered container', (t) => {
  const wrapper = mount(<SnackbarController><div /></SnackbarController>);
  const instance = wrapper.instance();

  t.throws(() => instance.addSnackbar());
});

test('should call the closeSnackbarCallback when the closeSnackbar method get\'s called', (t) => {
  const spy = sinon.spy();
  const wrapper = mount(<SnackbarController><div /></SnackbarController>);
  const instance = wrapper.instance();

  instance.initiateContainer(null, spy);

  instance.closeSnackbar();

  t.deepEqual(spy.callCount, 1);
});

test('should throw an error when closeSnackbar is called without an registered container', (t) => {
  const wrapper = mount(<SnackbarController><div /></SnackbarController>);
  const instance = wrapper.instance();

  t.throws(() => instance.closeSnackbar());
});

test('should be able to remove the current snackbar container', (t) => {
  const wrapper = mount(<SnackbarController><div /></SnackbarController>);
  const instance = wrapper.instance();

  instance.initiateContainer();
  instance.removeContainer();

  t.deepEqual(instance.hasController, false);
});
