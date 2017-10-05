import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';

import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

import RippleWrapper, { Ripple } from './ripple';

test('should render a Jss HoC and a span with the ripple class', (t) => {
  const wrapper = mount(<RippleWrapper />);

  t.deepEqual(wrapper.find('Jss(Ripple)').length, 1);
  t.deepEqual(wrapper.find('span.ripple').length, 1);
});

test('should add a centered wave when the ripple is pressed', (t) => {
  const wrapper = mount(
    <Ripple
      center
      classes={createClassesFromStyles(Ripple.styles)}
    />,
  );
  const instance = wrapper.instance();

  instance.ripple.getBoundingClientRect = () => {
    return {
      width: 6,
      height: 8,
    };
  };

  instance.handlePress();

  const wave = wrapper.state('waves')[0];

  t.deepEqual(wrapper.state('waves').length, 1);
  t.deepEqual(wave.style.left, -2);
  t.deepEqual(wave.style.top, -1);
});

test('should add a wave when the ripple is pressed', (t) => {
  const wrapper = mount(<Ripple classes={createClassesFromStyles(Ripple.styles)} />);
  const instance = wrapper.instance();

  instance.handlePress({
    x: 5,
    y: 5,
  });

  t.deepEqual(wrapper.state('waves').length, 1);
});

test('should call startFadeOutAnimation on a wave when the handleRelease is called', (t) => {
  const wrapper = mount(<Ripple classes={createClassesFromStyles(Ripple.styles)} />);
  const instance = wrapper.instance();

  instance.handlePress();

  instance.handleRelease();

  t.true(wrapper.state('waves')[0].animatingOut);
});

test('should call startFadeOutAnimation on a wave when the handleMouseLeave is called', (t) => {
  const wrapper = mount(<Ripple classes={createClassesFromStyles(Ripple.styles)} />);
  const instance = wrapper.instance();

  instance.handlePress();

  instance.handleMouseLeave();

  t.true(wrapper.state('waves')[0].animatingOut);
});

test('should remove a wave when the handleOnAnimationFinish is called', (t) => {
  const wrapper = mount(<Ripple classes={createClassesFromStyles(Ripple.styles)} />);
  const instance = wrapper.instance();

  instance.handlePress();

  instance.handlePress();

  instance.handleAnimationFinish(1);

  t.deepEqual(wrapper.state('waves').length, 1);
});

test('should change the opacity when isFocused prop is passed', (t) => {
  const wrapper = mount(
    <Ripple
      isFocused
      classes={createClassesFromStyles(Ripple.styles)}
    />,
  );

  t.deepEqual(wrapper.find('.ripple--focus').prop('style').opacity, 0.2);
});

test('should add the ripple--round class when the round prop is passed', (t) => {
  const wrapper = mount(
    <Ripple
      round
      classes={createClassesFromStyles(Ripple.styles)}
    />,
  );

  t.deepEqual(wrapper.find('.ripple--wave-container.ripple--round').length, 1);
});
