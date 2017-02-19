import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import Fab from './fab.jsx';
import {
  shallow,
  mount,
} from 'tests/enzyme';

test('should render a button', (t) => {
  const wrapper = shallow(<Fab icon="build" />);

  t.deepEqual(wrapper.find('button').length, 1);
});

test('should have a ripple inside', (t) => {
  const wrapper = shallow(<Fab icon="build" />);

  t.deepEqual(wrapper.find('Ripple').length, 1);
});

test('should animate the fab in', (t) => {
  mount(
    <Fab
      animateIn
      icon="build"
    />,
  );

  t.pass();
});

test('should have a different size if the fab is in mini mode', (t) => {
  const wrapper = shallow(
    <Fab
      mini
      icon="build"
    />,
  );
  const button = wrapper.find('button').first();
  const instance = wrapper.instance();

  t.deepEqual(button.prop('style').height, instance.theme.miniSize);
  t.deepEqual(button.prop('style').width, instance.theme.miniSize);
});

test('should set the aria-disabled prop to true', (t) => {
  const wrapper = shallow(
    <Fab
      disabled
      icon="build"
    />,
  );
  const button = wrapper.find('button').first();

  t.deepEqual(button.prop('aria-disabled'), true);
});

test('should compute the elevation based on the props and the state', (t) => {
  const wrapper = mount(<Fab icon="build" />);
  const instance = wrapper.instance();

  t.deepEqual(instance.elevation, 1);

  wrapper.setState({ pressed: true });

  const pressedElevation = instance.elevation;

  t.deepEqual(pressedElevation, 4);

  wrapper.setState({
    pressed: false,
    focused: true,
  });

  t.deepEqual(instance.elevation, pressedElevation);

  wrapper.setProps({ disabled: true });

  t.deepEqual(instance.elevation, 0);
});

test('should handle focus events correctly', (t) => {
  const onFocus = sinon.spy();
  const onBlur = sinon.spy();
  const wrapper = shallow(
    <Fab
      icon="build"
      onFocus={onFocus}
      onBlur={onBlur}
    />,
  );

  wrapper.simulate('focus');

  t.deepEqual(onFocus.callCount, 1);
  t.deepEqual(wrapper.state('focused'), true);

  wrapper.simulate('blur');

  t.deepEqual(onBlur.callCount, 1);
  t.deepEqual(wrapper.state('focused'), false);
});

test('should handle touch events correctly', (t) => {
  const onTouchStart = sinon.spy();
  const onTouchEnd = sinon.spy();
  const wrapper = shallow(
    <Fab
      icon="build"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    />,
  );

  wrapper.simulate('touchStart');

  t.deepEqual(onTouchStart.callCount, 1);
  t.deepEqual(wrapper.state('pressed'), true);

  wrapper.simulate('touchEnd');

  t.deepEqual(onTouchEnd.callCount, 1);
  t.deepEqual(wrapper.state('pressed'), false);
});

test('should handle mouse events correctly', (t) => {
  const onMouseDown = sinon.spy();
  const onMouseUp = sinon.spy();
  const wrapper = shallow(
    <Fab
      icon="build"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />,
  );

  wrapper.simulate('mouseDown');

  t.deepEqual(onMouseDown.callCount, 1);
  t.deepEqual(wrapper.state('pressed'), true);

  wrapper.simulate('mouseUp');

  t.deepEqual(onMouseUp.callCount, 1);
  t.deepEqual(wrapper.state('pressed'), false);
});

test('should not handle key events where the key codes don\'t match', (t) => {
  const onKeyDown = sinon.spy();
  const onKeyUp = sinon.spy();
  const wrapper = shallow(
    <Fab
      icon="build"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    />,
  );

  wrapper.simulate('keyDown');

  t.deepEqual(onKeyDown.callCount, 1);
  t.deepEqual(wrapper.state('pressed'), false);
});

test('should only handle key events where the key codes match', (t) => {
  const onKeyDown = sinon.spy();
  const onKeyUp = sinon.spy();
  const wrapper = shallow(
    <Fab
      icon="build"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    />,
  );

  t.plan(Fab.keyCodes.length * 2);

  Fab.keyCodes.forEach((keyCode, index) => {
    wrapper.simulate('keyDown', { keyCode });

    t.deepEqual(onKeyDown.callCount, index + 1);
    t.deepEqual(wrapper.state('pressed'), true);

    wrapper.simulate('keyUp');
  });
});

test('should only update the state when a key is not already pressed', (t) => {
  const onPress = sinon.spy();
  const wrapper = shallow(
    <Fab
      icon="build"
      onPress={onPress}
    />,
  );

  wrapper.simulate('keyDown', { keyCode: Fab.keyCodes[0] });

  t.deepEqual(onPress.callCount, 1);

  wrapper.simulate('keyDown', { keyCode: Fab.keyCodes[0] });

  t.deepEqual(onPress.callCount, 1);
});

test('all events should work when no handlers are passed', (t) => {
  const wrapper = shallow(<Fab icon="build" />);

  wrapper.simulate('keyDown');
  wrapper.simulate('keyUp');

  wrapper.simulate('mouseDown');
  wrapper.simulate('mouseUp');

  wrapper.simulate('touchStart');
  wrapper.simulate('touchEnd');

  wrapper.simulate('focus');
  wrapper.simulate('blur');

  t.pass();
});
