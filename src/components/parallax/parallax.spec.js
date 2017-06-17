import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount } from 'enzyme';

import ParallaxWrapper, { Parallax } from './parallax';

const classes = {
  root: '',
  image: '',
  content: '',
};

test('should render a div with an img and a div inside', (t) => {
  const wrapper = mount(<ParallaxWrapper img="image" />);

  t.deepEqual(wrapper.find('Jss(Parallax)').length, 1);
  t.deepEqual(wrapper.find('img').length, 1);
  t.deepEqual(wrapper.find('.parallax--content').length, 1);
});

test('should not calculate the position if onScroll get\'s called twice', (t) => {
  const wrapper = mount(
    <Parallax
      classes={classes}
      img="image"
    />,
  );
  const instance = wrapper.instance();

  instance.onScroll();
  instance.onScroll();

  t.pass();
});

test('should not update the scroll pos when the image isn\'t visible', (t) => {
  const wrapper = mount(
    <Parallax
      img="image"
      classes={classes}
    />,
  );
  const instance = wrapper.instance();

  window.innerHeight = -100;

  t.deepEqual(instance.isVisible, false);

  instance.onScroll();
});

test('should remove the event listener when the node get\'s unmounted', (t) => {
  const wrapper = mount(<ParallaxWrapper img="image" />);
  const removeEventListener = sinon.spy(window, 'removeEventListener');

  wrapper.unmount();

  t.deepEqual(removeEventListener.callCount, 1);
});
