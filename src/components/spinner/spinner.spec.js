import test from 'ava';
import React from 'react';

import { mount } from '../../../tests/helpers/enzyme';

import Spinner from './spinner';

test('should render a Jss Hoc and a div with the class of progress', (t) => {
  const wrapper = mount(<Spinner />);

  t.deepEqual(wrapper.find('Jss(Spinner)').length, 1);
});

test('should fade in the animation when the active prop is passed', (t) => {
  const wrapper = mount(<Spinner />);

  wrapper.setProps({ active: true });

  wrapper
    .find('.spinner')
    .simulate('transitionEnd');

  t.deepEqual(wrapper.find('.spinner--active').length, 1);
});

test('should change the opacity to 0 when the active prop is removed', (t) => {
  const wrapper = mount(<Spinner active />);

  wrapper.setProps({ active: false });

  t.deepEqual(
    wrapper
      .find('.spinner')
      .prop('style')
      .opacity,
    0,
  );
});

test('should set the active state to false when the spinner has finished animating out', (t) => {
  const wrapper = mount(<Spinner active />);

  wrapper.setProps({ active: false });

  wrapper
    .find('.spinner')
    .simulate('transitionEnd');

  t.deepEqual(wrapper.find('.spinner--active').length, 0);
});
