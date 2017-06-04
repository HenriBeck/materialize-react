import React from 'react';
import test from 'ava';

import Ripple, { RippleContainer } from './ripple-container';
import { mount } from 'enzyme';

test('should render a jss hoc component and a RippleContainer component', (t) => {
  const wrapper = mount(<Ripple />);

  t.deepEqual(wrapper.find('Jss(RippleContainer)').length, 1);
  t.deepEqual(wrapper.find('RippleContainer').length, 1);
});

test('should add a wave when the addWave method get\'s called', (t) => {
  const wrapper = mount(<RippleContainer classes={{}} />);
  const instance = wrapper.instance();

  instance.addWave();

  t.deepEqual(wrapper.state('waves').length, 1);
});

test('should remove a wave when the removeWave method get\'s called', (t) => {
  const wrapper = mount(<RippleContainer classes={{}} />);
  const instance = wrapper.instance();

  instance.addWave();
  instance.addWave();

  instance.removeWave(1);

  t.deepEqual(wrapper.state('waves').length, 1);
});

test('should remove a wave when the wave animation finishes', (t) => {
  const wrapper = mount(<RippleContainer classes={{}} />);
  const instance = wrapper.instance();

  instance.addWave();

  instance.handleAnimationFinish(1);

  t.deepEqual(wrapper.state('waves').length, 0);
});

test('should center a ripple when the center prop is passed', (t) => {
  const wrapper = mount(
    <RippleContainer
      center
      classes={{}}
    />,
  );
  const instance = wrapper.instance();

  instance.addWave();

  t.pass();
});

test('should render different styles when the nowaves and round props is passed', (t) => {
  const wrapper = mount(
    <Ripple
      round
      nowaves
    />,
  );
  const styles = wrapper.find('RippleContainer').first().node.props.sheet.rules.map;

  t.deepEqual(styles.ripple.renderable.style['pointer-events'], 'none');
  t.deepEqual(styles.focus.renderable.style['border-radius'], '50%');
  t.deepEqual(styles.waveContainer.renderable.style['border-radius'], '50%');
});

test('should emit the ripple there where the user clicked', (t) => {
  const wrapper = mount(<RippleContainer classes={{}} />);
  const instance = wrapper.instance();

  instance.addWave({
    x: 3,
    y: 4,
  });
  const wave = wrapper.state('waves')[0];

  t.deepEqual(wave.radius, 5);
  t.deepEqual(wave.style.left, -2);
  t.deepEqual(wave.style.top, -1);
});

test('functions from default props can be called', (t) => {
  Ripple.defaultProps.onMouseUp();
  Ripple.defaultProps.onMouseDown();
  Ripple.defaultProps.onTouchStart();
  Ripple.defaultProps.onTouchEnd();

  t.pass();
});

