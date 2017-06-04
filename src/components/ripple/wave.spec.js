import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import { mount } from '../../../tests/helpers/enzyme';
import Wave from './wave';

const defaultProps = {
  classes: { wave: 'wave' },
  id: 1,
  style: {},
  radius: 2,
  initialOpacity: 0.25,
  onFinish: () => {},
};

test('should render a span', (t) => {
  const wrapper = mount(<Wave {...defaultProps} />);

  t.deepEqual(wrapper.find('span').length, 1);
});

test('animate the wave out', (t) => {
  const wrapper = mount(<Wave {...defaultProps} />);
  const instance = wrapper.instance();

  instance.startFadeOutAnimation();

  t.true(Boolean(instance.animation));
});

test('should call the onFinish handler', (t) => {
  const props = {
    ...defaultProps,
    onFinish: sinon.spy(),
  };
  const wrapper = mount(<Wave {...props} />);
  const instance = wrapper.instance();

  instance.startFadeOutAnimation();

  instance.animation.onfinish();

  t.deepEqual(props.onFinish.callCount, 1);
});
