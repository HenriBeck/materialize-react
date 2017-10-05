import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import {
  shallow,
  mount,
} from 'enzyme';

import EventHandler from './event-handler';

/**
 * Create an event object with the required timeStamp property.
 *
 * @returns {Object} - Returns the event object.
 */
function createEvent() {
  return { timeStamp: Date.now() };
}

test('should call onPress when a mouse or touch event happens', (t) => {
  const onPress = sinon.spy();
  const wrapper = shallow(
    <EventHandler
      component="span"
      onPress={onPress}
    />,
  );

  wrapper.simulate('mouseDown', createEvent());

  t.deepEqual(onPress.callCount, 1);

  wrapper.simulate('touchStart', createEvent());

  t.deepEqual(onPress.callCount, 2);
});

test('should call onPress only once when a mouse event happens after a touch event', (t) => {
  const onPress = sinon.spy();
  const wrapper = shallow(
    <EventHandler
      component="span"
      onPress={onPress}
    />,
  );

  wrapper.simulate('touchStart', createEvent());

  t.deepEqual(onPress.callCount, 1);

  wrapper.simulate('mouseDown', createEvent());

  t.deepEqual(onPress.callCount, 1);
});

test('should call onRelease when a mouse or touch event happens', (t) => {
  const onRelease = sinon.spy();
  const wrapper = shallow(
    <EventHandler
      component="span"
      onRelease={onRelease}
    />,
  );

  wrapper.simulate('mouseUp', createEvent());

  t.deepEqual(onRelease.callCount, 1);

  wrapper.simulate('touchEnd', createEvent());

  t.deepEqual(onRelease.callCount, 2);
});

test('should call onRelease only once when a mouse event happens after a touch event', (t) => {
  const onRelease = sinon.spy();
  const wrapper = shallow(
    <EventHandler
      component="span"
      onRelease={onRelease}
    />,
  );

  wrapper.simulate('touchEnd', createEvent());

  t.deepEqual(onRelease.callCount, 1);

  wrapper.simulate('mouseUp', createEvent());

  t.deepEqual(onRelease.callCount, 1);
});

test('should call the actual mouse event handlers', (t) => {
  const onPress = () => true;
  const onMouseDown = sinon.spy();
  const onMouseUp = sinon.spy();
  const wrapper = shallow(
    <EventHandler
      component="span"
      onPress={onPress}
      onRelease={onPress}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />,
  );

  wrapper.simulate('mouseDown', createEvent());

  t.deepEqual(onMouseDown.callCount, 1);

  wrapper.simulate('mouseUp', createEvent());

  t.deepEqual(onMouseUp.callCount, 1);
});

test('should call the actual touch event handlers', (t) => {
  const onPress = () => true;
  const onTouchStart = sinon.spy();
  const onTouchEnd = sinon.spy();
  const wrapper = shallow(
    <EventHandler
      component="span"
      onPress={onPress}
      onRelease={onPress}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    />,
  );

  wrapper.simulate('touchStart', createEvent());

  t.deepEqual(onTouchStart.callCount, 1);

  wrapper.simulate('touchEnd', createEvent());

  t.deepEqual(onTouchEnd.callCount, 1);
});

test('should call the actual key event handlers', (t) => {
  const onKeyPress = () => true;
  const onKeyDown = sinon.spy();
  const onKeyUp = sinon.spy();
  const wrapper = shallow(
    <EventHandler
      component="span"
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    />,
  );

  wrapper.simulate('keyDown');

  t.deepEqual(onKeyDown.callCount, 1);

  wrapper.simulate('keyUp');

  t.deepEqual(onKeyUp.callCount, 1);
});

test('should set the isPressingKey property to true when a mouseDown event happens', (t) => {
  const onKeyPress = () => true;
  const wrapper = shallow(
    <EventHandler
      component="span"
      onKeyPress={onKeyPress}
    />,
  );

  wrapper.simulate('keyDown');

  t.deepEqual(wrapper.instance().isPressingKey, true);
});

test('should set the isPressingKey property to false again when a mouseUp event happens', (t) => {
  const onKeyPress = () => true;
  const wrapper = shallow(
    <EventHandler
      component="span"
      onKeyPress={onKeyPress}
    />,
  );

  wrapper.simulate('keyDown');
  wrapper.simulate('keyUp');

  t.deepEqual(wrapper.instance().isPressingKey, false);
});

test('should not call onKeyPress when two mouseDown events happen without a mouse up', (t) => {
  const onKeyPress = sinon.spy();
  const wrapper = shallow(
    <EventHandler
      component="span"
      onKeyPress={onKeyPress}
    />,
  );

  wrapper.simulate('keyDown');

  t.deepEqual(onKeyPress.callCount, 1);

  wrapper.simulate('keyDown');

  t.deepEqual(onKeyPress.callCount, 1);
});

test('should pass the createRef to the root element as the ref', (t) => {
  const createRef = sinon.spy();

  mount(
    <EventHandler
      component="span"
      createRef={createRef}
    />,
  );

  t.deepEqual(createRef.callCount, 1);
});

