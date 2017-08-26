import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount } from 'enzyme';

import Wave from './wave';

const defaultProps = {
  className: 'wave',
  id: 1,
  style: {
    height: 2,
    width: 2,
    left: -2,
    top: -2,
  },
  radius: 2,
  initialOpacity: 0.25,
  onFinish: () => {},
};

test('should render an element with the class of wave', (t) => {
  const wrapper = mount(<Wave {...defaultProps} />);

  t.deepEqual(wrapper.find('.wave').length, 1);
});

test('animate the wave out', (t) => {
  const wrapper = mount(<Wave {...defaultProps} />);
  const instance = wrapper.instance();

  instance.startFadeOutAnimation();

  t.deepEqual(wrapper.find('.wave').node.style.opacity, '0');
});

test('should call the onFinish handler', (t) => {
  const onFinish = sinon.spy();
  const wrapper = mount(
    <Wave
      {...defaultProps}
      onFinish={onFinish}
    />,
  );

  wrapper.simulate('transitionEnd');

  t.deepEqual(onFinish.callCount, 1);
});
