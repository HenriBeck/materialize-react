import test from 'ava';
import React from 'react';

import { mount } from '/tests/helpers/enzyme';
import Spinner from './spinner';

test('should render a div with an svg inside', (t) => {
  const wrapper = mount(<Spinner />);
  const children = wrapper.find('.spinner').children();

  t.deepEqual(children.length, 1);
  t.deepEqual(children.children().length, 1);
});

test('should fade in the animation when the active prop is passed', (t) => {
  const wrapper = mount(<Spinner active />);
  const root = wrapper.find('.spinner');

  t.deepEqual(root.node.style.opacity, '1');
});

test('should fade in/out the animation when the active prop is changed', (t) => {
  const wrapper = mount(<Spinner active />);
  const root = wrapper.find('.spinner');

  t.deepEqual(root.node.style.opacity, '1');

  wrapper.setProps({ active: false });

  t.deepEqual(root.node.style.opacity, '0');

  wrapper.setProps({ active: true });

  t.deepEqual(root.node.style.opacity, '1');
});

test('should not update the opacity of the spinner and only add the new styles', (t) => {
  const wrapper = mount(<Spinner active />);

  wrapper.setProps({ style: { height: '64px' } });

  const div = wrapper.find('.spinner');

  t.deepEqual(div.node.style.height, '64px');
  t.deepEqual(div.node.style.opacity, '1');
});
