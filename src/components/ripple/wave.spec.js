import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import Wave from './wave';
import { mount } from '/tests/helpers/enzyme';

function renderWave(onFinish = () => {}) {
  return mount(
    <Wave
      id={1}
      style={{}}
      radius={2}
      initialOpacity={0.6}
      onFinish={onFinish}
    />,
  );
}

test('should render a span', (t) => {
  const wrapper = renderWave();

  t.deepEqual(wrapper.find('span').length, 1);
});

test('should animate the span to scale 1', (t) => {
  const wrapper = renderWave();
  const span = wrapper.find('span').first();

  t.deepEqual(span.node.style.transform, 'scale(1)');
});

test('should fade the wave out when the upAction get\'s called', (t) => {
  const wrapper = renderWave();
  const instance = wrapper.instance();

  instance.upAction();

  const span = wrapper.find('span').first();

  t.deepEqual(span.node.style.opacity, '0');
});

test('should call the onFinish function when the wave faded out', (t) => {
  const onFinish = sinon.spy();
  const wrapper = renderWave(onFinish);
  const instance = wrapper.instance();

  instance.upAction();

  instance.animation.onfinish();

  t.deepEqual(onFinish.callCount, 1);
});

