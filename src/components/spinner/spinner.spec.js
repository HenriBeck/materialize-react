import test from 'ava';
import React from 'react';

import { mount } from '../../../tests/helpers/enzyme';

import Spinner from './spinner';

test('should render a div with an svg inside', (t) => {
  const wrapper = mount(<Spinner />);

  t.deepEqual(wrapper.find('Jss(Spinner)').length, 1);
});

test('should fade in the animation when the active prop is passed', (t) => {
  const wrapper = mount(<Spinner active />);
  const root = wrapper.find('.spinner');

  t.deepEqual(root.node.style.opacity, '1');
});

test('should fade the spinner in/out when the active prop changes', (t) => {
  const wrapper = mount(<Spinner />);
  const root = () => wrapper.find('.spinner');

  wrapper.setProps({ active: true });

  t.deepEqual(root().node.style.opacity, '1');

  wrapper.setProps({ active: false });

  t.deepEqual(root().node.style.opacity, '0');
});

test('should remove the active class when the transition end handler get\'s called', (t) => {
  const wrapper = mount(<Spinner />);

  wrapper.setProps({ active: true });

  wrapper.simulate('transitionEnd');

  wrapper.setProps({ active: false });

  wrapper.simulate('transitionEnd');

  const root = wrapper.find('.spinner');

  t.true(!root.node.classList.contains('spinner--active'));
});

test('should not update the opacity of the spinner when the active prop doesn\'t changes', (t) => {
  const wrapper = mount(<Spinner />);

  wrapper.setProps({ className: 'spinner--test' });

  const className = wrapper.find('.spinner').prop('className');

  t.true(className.includes('spinner--test'));
});
