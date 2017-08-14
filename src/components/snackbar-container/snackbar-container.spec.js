import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import delay from 'delay';
import { mount } from 'enzyme';

import { shallow } from '../../../tests/helpers/enzyme';
import SnackbarContainerWrapper, { SnackbarContainer } from './snackbar-container';

/**
 * Simulate the context for the SnackbarContainer.
 *
 * @returns {Object} - Returns the context.
 */
function getContext() {
  return {
    snackbarController: {
      initiateContainer: sinon.spy(),
      removeContainer: sinon.spy(),
    },
  };
}

const classes = {
  snackbarContainer: 'snackbar--container',
  snackbar: 'snackbar',
};

test('should render a Jss HoC', (t) => {
  const wrapper = shallow(<SnackbarContainerWrapper />);

  t.deepEqual(wrapper.find('SnackbarContainer').length, 1);
});

test('should initiate the container on mount and remove it on unmount', (t) => {
  const context = getContext();
  const wrapper = mount(<SnackbarContainer classes={classes} />, { context });

  t.deepEqual(context.snackbarController.initiateContainer.callCount, 1);

  wrapper.unmount();

  t.deepEqual(context.snackbarController.removeContainer.callCount, 1);
});

test('should increase the snackbar count when the addSnackbar method is called', (t) => {
  const wrapper = mount(<SnackbarContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();

  instance.addSnackbar({});

  t.deepEqual(instance.snackbarCount, 1);
});

test('should set currentlyVisible when no snackbar is visible and addSnackbar is called', (t) => {
  const wrapper = mount(<SnackbarContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();

  instance.addSnackbar({});

  t.deepEqual(wrapper.state('currentlyVisible'), 1);
});

test('should add the snackbar to the array when the addSnackbar is called', (t) => {
  const wrapper = mount(<SnackbarContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();

  instance.addSnackbar({});
  instance.addSnackbar({});

  t.deepEqual(instance.snackbars.length, 2);
});

test('should filter the snackbars when the closeSnackbar is called', (t) => {
  const wrapper = mount(<SnackbarContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();

  instance.addSnackbar({});
  instance.addSnackbar({});

  instance.closeSnackbar(2);

  t.deepEqual(instance.snackbars.length, 1);
});

test('should set the animatinOut state when the current snackbar is closed', (t) => {
  const wrapper = mount(<SnackbarContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();

  instance.addSnackbar({});

  instance.closeSnackbar('current');

  t.deepEqual(wrapper.state('animatingOut'), true);
});

test('should reset the animatingOut state when the animation finishes', (t) => {
  const wrapper = mount(<SnackbarContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();

  instance.addSnackbar({ onClose: () => {} });

  instance.handleAnimationEnd();

  instance.closeSnackbar(1);

  instance.handleAnimationEnd();

  t.deepEqual(wrapper.state('animatingOut'), false);
});

test('should set the currentlyVisible to the next snackbar when the old got removed', (t) => {
  const wrapper = mount(<SnackbarContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();

  instance.addSnackbar({ onClose: () => {} });
  instance.addSnackbar({ onClose: () => {} });

  instance.closeSnackbar('current');

  instance.handleAnimationEnd();

  t.deepEqual(wrapper.state('currentlyVisible'), 2);
});

test('should create a timeout after which the snackbar get\'s closed', async (t) => {
  const wrapper = mount(<SnackbarContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();

  instance.closeSnackbar = sinon.spy();

  instance.addSnackbar({ autoCloseTimer: 1000 });

  await delay(1000);

  t.deepEqual(instance.closeSnackbar.callCount, 1);
});
