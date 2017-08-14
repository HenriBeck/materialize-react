import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';
import sinon from 'sinon';

import Snackbar from './snackbar';

/**
 * Simulate a context for the Snackbar component.
 *
 * @returns {Object} - Returns the simulated context.
 */
function getContext() {
  return {
    snackbarController: {
      addSnackbar: sinon.spy(),
      closeSnackbar: sinon.spy(),
    },
  };
}

test('should call addSnackbar on mount when the prop autoShowOnMount is passed', (t) => {
  const context = getContext();

  mount(<Snackbar autoShowOnMount>Content</Snackbar>, { context });

  t.deepEqual(context.snackbarController.addSnackbar.callCount, 1);
});

test('should call addSnackbar when the show method is called', (t) => {
  const context = getContext();
  const wrapper = mount(<Snackbar>Content</Snackbar>, { context });
  const instance = wrapper.instance();

  instance.show();

  t.deepEqual(context.snackbarController.addSnackbar.callCount, 1);
});

test('should call closeSnackbar when the close method is called', (t) => {
  const context = getContext();
  const wrapper = mount(<Snackbar>Content</Snackbar>, { context });
  const instance = wrapper.instance();

  instance.close();

  t.deepEqual(context.snackbarController.closeSnackbar.callCount, 1);
});

test('should have a default prop for the onClose function', (t) => {
  const context = getContext();
  const wrapper = mount(<Snackbar>Content</Snackbar>, { context });

  wrapper.prop('onClose')();

  t.pass();
});
