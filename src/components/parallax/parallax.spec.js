import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount } from 'enzyme';

import ParallaxWrapper, { Parallax } from './parallax';

const defaultProps = {
  classes: {},
  img: 'img',
};

test('should render a div with an img and a div inside', (t) => {
  const wrapper = mount(<ParallaxWrapper img="image" />);

  t.deepEqual(wrapper.find('Jss(Parallax)').length, 1);
  t.deepEqual(wrapper.find('img').length, 1);
  t.deepEqual(wrapper.find('.parallax--content').length, 1);
});

test('should warn against changing the img prop', (t) => {
  const wrapper = mount(<ParallaxWrapper img="img" />);

  t.throws(() => wrapper.setProps({ img: 'img2' }));
});

test('should remove event listeners from the document when the component unmounts', (t) => {
  const wrapper = mount(<ParallaxWrapper img="img" />);
  const spy = sinon.spy(window, 'removeEventListener');

  wrapper.unmount();

  t.deepEqual(spy.callCount, 2);
});

test('should call the positionImage function when the user scrolls', (t) => {
  const wrapper = mount(<Parallax {...defaultProps} />);
  const instance = wrapper.instance();
  const spy = sinon.spy(instance, 'positionImage');

  instance.handleScroll();

  t.deepEqual(spy.callCount, 1);
});

test('should call the positionImage and computeValues function when the window resizes', (t) => {
  const wrapper = mount(<Parallax {...defaultProps} />);
  const instance = wrapper.instance();
  const positionImage = sinon.spy(instance, 'positionImage');
  const computeValues = sinon.spy(instance, 'computeValues');

  instance.handleResize();

  t.deepEqual(positionImage.callCount, 1);
  t.deepEqual(computeValues.callCount, 1);
});

test('should default position the parallax to the end', (t) => {
  window.innerHeight = -100;

  const wrapper = mount(<Parallax {...defaultProps} />);
  const instance = wrapper.instance();

  instance.positionImage();

  // In this case the overflowImageHeight is 0 which means that second
  // parameter will be zero
  t.deepEqual(instance.image.style.transform, 'translate3D(0, 0px, 0)');
});
