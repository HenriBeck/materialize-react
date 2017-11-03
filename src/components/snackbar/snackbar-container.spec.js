import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import { mount } from '../../../tests/helpers/enzyme';

import SnackbarContainer from './snackbar-container';

test('should call createRef when the component get\'s constructed', (t) => {
  const createRef = sinon.spy();

  mount(
    <SnackbarContainer
      snackbars={[]}
      createRef={createRef}
    />,
  );

  t.deepEqual(createRef.callCount, 1);
});

test('should render a div with the class of snackbar--container', (t) => {
  const wrapper = mount(
    <SnackbarContainer snackbars={[]} />,
    { type: 'dark' },
  );

  t.deepEqual(wrapper.find('div.snackbar--container').length, 1);
});

test('should clear the timeout when the component unmounts', (t) => {
  const spy = sinon.spy(global, 'clearTimeout');
  const wrapper = mount(<SnackbarContainer snackbars={[]} />);

  wrapper.unmount();

  t.deepEqual(spy.callCount, 1);

  clearTimeout.restore();
});

test('should render the current snackbar', (t) => {
  const wrapper = mount(<SnackbarContainer snackbars={[{ content: 'Test' }]} />);

  t.deepEqual(wrapper.find('span.snackbar').length, 1);
});

test('should change the animation name when the ', (t) => {
  const wrapper = mount(<SnackbarContainer snackbars={[{ content: 'Test' }]} />);
  const instance = wrapper.find('SnackbarContainer').instance();

  instance.removeCurrentSnackbar();

  t.deepEqual(instance.state.animatingOut, true);
});

test('should create a timeout if the current snackbar has an autoCloseTimer', (t) => {
  const wrapper = mount(
    <SnackbarContainer
      snackbars={[{
        content: 'Test',
        autoCloseTimer: 5 * 1000,
      }]}
    />,
  );
  const instance = wrapper.find('SnackbarContainer').instance();

  instance.handleAnimationEnd();

  t.notDeepEqual(instance.timeout, null);
});

test('should not create a timeout if the snackbar doesn\'t have a autoCloseTimer', (t) => {
  const wrapper = mount(<SnackbarContainer snackbars={[{ content: 'Test' }]} />);
  const instance = wrapper.find('SnackbarContainer').instance();

  instance.handleAnimationEnd();

  t.deepEqual(instance.timeout, null);
});

test('should call onRemoveSnackbar when the current snackbar animates out', (t) => {
  const onRemoveSnackbar = sinon.spy();
  const wrapper = mount(
    <SnackbarContainer
      snackbars={[{ content: 'Test' }]}
      onRemoveSnackbar={onRemoveSnackbar}
    />,
  );
  const instance = wrapper.find('SnackbarContainer').instance();

  instance.removeCurrentSnackbar();

  instance.handleAnimationEnd();

  t.deepEqual(onRemoveSnackbar.callCount, 1);
});

test('should change the animatingOut state back to false', (t) => {
  const wrapper = mount(<SnackbarContainer snackbars={[{ content: 'Test' }]} />);
  const instance = wrapper.find('SnackbarContainer').instance();

  instance.removeCurrentSnackbar();

  instance.handleAnimationEnd();

  wrapper.setProps({ snackbars: [] });

  wrapper.setProps({ className: 'tes' });

  t.deepEqual(instance.state.animatingOut, false);
});
