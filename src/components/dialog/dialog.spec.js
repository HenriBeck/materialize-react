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
