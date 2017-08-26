import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount } from 'enzyme';

import { shallow } from '../../../tests/helpers/enzyme';
import DialogContainerWrapper, { DialogContainer } from './dialog-container';
import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

const classes = createClassesFromStyles(DialogContainer.styles);

/**
 * Simulate the context for the DialogContainer.
 *
 * @returns {Object} - Returns the context.
 */
function getContext() {
  return {
    dialogController: {
      initiateContainer: sinon.spy(),
      removeContainer: sinon.spy(),
    },
  };
}

const dialog = { component: () => null };

test('should render a DialogContainer', (t) => {
  const wrapper = shallow(<DialogContainerWrapper />);

  t.deepEqual(wrapper.find('DialogContainer').length, 1);
});

test('should initiate the controller on mount and remove it on unmount', (t) => {
  const context = getContext();
  const wrapper = mount(<DialogContainer classes={classes} />, { context });

  t.deepEqual(context.dialogController.initiateContainer.callCount, 1);

  wrapper.unmount();

  t.deepEqual(context.dialogController.removeContainer.callCount, 1);
});

test('should update the state when the openDialog method get\'s called', (t) => {
  const wrapper = mount(<DialogContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();

  instance.openDialog(dialog);

  t.deepEqual(wrapper.state('currentDialog'), dialog);
});

test('should throw an error if we open a dialog when one is already opened', (t) => {
  const wrapper = mount(<DialogContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();

  instance.openDialog(dialog);

  t.throws(() => instance.openDialog(dialog));
});

test('should set the animatingOut state to true when the closeDialog method get\'s called', (t) => {
  const wrapper = mount(<DialogContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();

  instance.openDialog(dialog);

  instance.closeDialog();

  t.deepEqual(wrapper.state('animatingOut'), true);
});

test('should throw an error when the closeDialog method get\'s called with no open dialog', (t) => {
  const context = getContext();
  const wrapper = mount(<DialogContainer classes={classes} />, { context });
  const instance = wrapper.instance();

  t.throws(() => instance.closeDialog());
});

test('should close the dialog when the backdrop is clicked', (t) => {
  const wrapper = mount(<DialogContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();
  const spy = sinon.spy(instance, 'closeDialog');

  instance.openDialog({
    ...dialog,
    closeOnOutsideClick: true,
  });

  instance.handleBackdropPress();

  t.deepEqual(spy.callCount, 1);
});

test('should not close the dialog when the closeOnOutsideClick prop is false', (t) => {
  const wrapper = mount(<DialogContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();
  const spy = sinon.spy(instance, 'closeDialog');

  instance.openDialog({
    ...dialog,
    closeOnOutsideClick: false,
  });

  instance.handleBackdropPress();

  t.deepEqual(spy.callCount, 0);
});

test('should add the dialog--backdrop-active class when the opened dialog has a backdrop', (t) => {
  const wrapper = mount(<DialogContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();

  instance.openDialog({
    ...dialog,
    backdrop: true,
  });

  t.deepEqual(wrapper.find('.dialog--backdrop-active').length, 1);
});

test('should reset the state when the animation finishes and call the onClose callback', (t) => {
  const wrapper = mount(<DialogContainer classes={classes} />, { context: getContext() });
  const instance = wrapper.instance();
  const onClose = sinon.spy();

  instance.openDialog(Object.assign({}, dialog, { onClose }));

  instance.handleAnimationEnd();

  instance.closeDialog();

  instance.handleAnimationEnd();

  t.deepEqual(wrapper.state('currentDialog'), null);
  t.deepEqual(wrapper.state('animatingOut'), false);
  t.deepEqual(onClose.callCount, 1);
});

