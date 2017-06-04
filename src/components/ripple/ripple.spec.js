import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import Ripple from './ripple';
import Wave from './wave';
import { mount } from '../../../tests/helpers/enzyme';

const defaultProps = {
  waves: [],
  initialOpacity: 0.25,
  classes: { ripple: 'ripple' },
  className: '',
  isFocused: false,
  focusOpacity: 0.2,
  focusColor: '',
  round: false,
  onDownAction: () => {},
  onAnimationFinish: () => {},
  onMouseDown: () => {},
  onMouseUp: () => {},
  onTouchStart: () => {},
  onTouchEnd: () => {},
};

test('should render a span with the riplpe class', (t) => {
  const wrapper = mount(<Ripple {...defaultProps} />);

  t.deepEqual(wrapper.find('span.ripple').length, 1);
});

test('should call the mouse event handler', (t) => {
  const onMouseDown = sinon.spy();
  const onMouseUp = sinon.spy();
  const wrapper = mount(
    <Ripple
      {...defaultProps}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    />,
  );
  const rootNode = wrapper.find('.ripple').first();

  rootNode.simulate('mouseDown');

  t.deepEqual(onMouseDown.callCount, 1);

  rootNode.simulate('mouseUp');

  t.deepEqual(onMouseUp.callCount, 1);
});

test('should call the touch event handler', (t) => {
  const onTouchStart = sinon.spy();
  const onTouchEnd = sinon.spy();
  const wrapper = mount(
    <Ripple
      {...defaultProps}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    />,
  );
  const rootNode = wrapper.find('.ripple').first();

  rootNode.simulate('touchStart');

  t.deepEqual(onTouchStart.callCount, 1);

  rootNode.simulate('touchEnd');

  t.deepEqual(onTouchEnd.callCount, 1);
});

test('should render a Wave component', (t) => {
  const wrapper = mount(
    <Ripple
      {...defaultProps}
      waves={[{
        id: 1,
        style: {},
        radius: 5,
      }]}
    />,
  );
  const rootNode = wrapper.find('.ripple').first();

  rootNode.simulate('touchEnd');

  t.deepEqual(wrapper.find(Wave).length, 1);
});
