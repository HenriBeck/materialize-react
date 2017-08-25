import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount } from 'enzyme';

import Dialog from './dialog';

/**
 * Simulate a context for the dialog context.
 *
 * @returns {Object} - Returns the simulated context.
 */
function getContext() {
  return {
    dialogController: {
      openDialog: sinon.spy(),
      closeDialog: sinon.spy(),
    },
  };
}

const component = () => null;

test('should call openDialog when the open method get\'s called', (t) => {
  const context = getContext();
  const wrapper = mount(<Dialog component={component} />, { context });
  const instance = wrapper.instance();

  instance.open();

  t.deepEqual(context.dialogController.openDialog.callCount, 1);
});

test('should call closeDialog when the open and the close method get\'s called', (t) => {
  const context = getContext();
  const wrapper = mount(<Dialog component={component} />, { context });
  const instance = wrapper.instance();

  instance.open();

  instance.isOpened = true;

  instance.close();

  t.deepEqual(context.dialogController.closeDialog.callCount, 1);
});

test('should throw an error when the close method get\'s called without the open method', (t) => {
  const context = getContext();
  const wrapper = mount(<Dialog component={component} />, { context });
  const instance = wrapper.instance();

  t.throws(() => instance.close());
});

test('should call the onClose prop when the onClose method get\'s called', (t) => {
  const context = getContext();
  const onClose = sinon.spy();
  const wrapper = mount(
    <Dialog
      component={component}
      onClose={onClose}
    />, { context });
  const instance = wrapper.instance();

  instance.open();

  instance.onClose();

  Dialog.defaultProps.onClose();

  t.deepEqual(onClose.callCount, 1);
});
