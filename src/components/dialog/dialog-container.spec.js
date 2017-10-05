import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount } from 'enzyme';

import { shallow } from '../../../tests/helpers/enzyme';
import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

import DialogContainerWrapper, { DialogContainer } from './dialog-container';

const context = {
  dialogController: {
    initiateContainer: () => {},
    removeContainer: () => {},
  },
};
const classes = createClassesFromStyles(DialogContainer.styles);
const dialog = { component: () => null };

test('should render a DialogContainer', (t) => {
  const wrapper = shallow(<DialogContainerWrapper />);

  t.deepEqual(wrapper.find('DialogContainer').length, 1);
});

test('should initiate the container when it mounts', (t) => {
  const spy = sinon.spy();

  mount(<DialogContainer classes={classes} />, {
    context: {
      dialogController: {
        initiateContainer: spy,
        removeContainer: () => {},
      },
    },
  });

  t.deepEqual(spy.callCount, 1);
});

test('should remove the container when it unmounts', (t) => {
  const spy = sinon.spy();
  const wrapper = mount(<DialogContainer classes={classes} />, {
    context: {
      dialogController: {
        initiateContainer: () => {},
        removeContainer: spy,
      },
    },
  });

  wrapper.unmount();

  t.deepEqual(spy.callCount, 1);
});

test('should update the state when the openDialog method get\'s called', (t) => {
  const wrapper = mount(<DialogContainer classes={classes} />, { context });
  const instance = wrapper.instance();

  instance.openDialog(dialog);

  t.deepEqual(wrapper.state('currentDialog'), dialog);
});

test('should throw an error if we try to open a dialog when one is already opened', (t) => {
  const wrapper = mount(<DialogContainer classes={classes} />, { context });
  const instance = wrapper.instance();

  instance.openDialog(dialog);

  t.throws(() => instance.openDialog(dialog));
});

test('should change the animatingOut state when the dialog is being closed', (t) => {
  const wrapper = mount(<DialogContainer classes={classes} />, { context });
  const instance = wrapper.instance();

  instance.openDialog(dialog);

  instance.closeDialog();

  t.deepEqual(wrapper.state('animatingOut'), true);
});

test('should set the isAnimatedIn prop when the animation finishes', (t) => {
  const wrapper = mount(<DialogContainer classes={classes} />, { context });
  const instance = wrapper.instance();

  instance.handleAnimationEnd();

  t.deepEqual(instance.isAnimatedIn, true);
});

test('should reset the state when the dialog is animating out and the animation finishes', (t) => {
  const wrapper = mount(<DialogContainer classes={classes} />, { context });
  const instance = wrapper.instance();
  const onClose = sinon.spy();

  instance.openDialog({
    ...dialog,
    onClose,
  });

  instance.closeDialog();

  instance.handleAnimationEnd();

  t.deepEqual(onClose.callCount, 1);
  t.deepEqual(wrapper.state('currentDialog'), null);
});

test('should close the dialog when the backdrop is pressed and the dialog is animated in', (t) => {
  const wrapper = mount(<DialogContainer classes={classes} />, { context });
  const instance = wrapper.instance();
  const spy = sinon.spy(instance, 'closeDialog');

  instance.openDialog({
    ...dialog,
    closeOnOutsideClick: true,
  });

  instance.handleAnimationEnd();

  instance.handleBackdropPress();

  t.deepEqual(spy.callCount, 1);
});

test('should not close the dialog when the closeOnOutsideClick property is false', (t) => {
  const wrapper = mount(<DialogContainer classes={classes} />, { context });
  const instance = wrapper.instance();
  const spy = sinon.spy(instance, 'closeDialog');

  instance.openDialog({
    ...dialog,
    closeOnOutsideClick: false,
  });

  instance.handleBackdropPress();

  t.deepEqual(spy.callCount, 0);
});
