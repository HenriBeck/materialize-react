import test from 'ava';
import React from 'react';

import { mount } from '../../../tests/helpers/enzyme';
import SpinnerWrapper, { Spinner } from './spinner';

test('should render a div with an svg inside', (t) => {
  const wrapper = mount(<SpinnerWrapper />);
  const children = wrapper.find('.spinner').children();

  t.deepEqual(wrapper.find('Jss(Spinner)').length, 1);
  t.deepEqual(children.length, 1);
  t.deepEqual(children.children().length, 1);
});

test('should fade in the animation when the active prop is passed', (t) => {
  const wrapper = mount(<SpinnerWrapper active />);
  const root = wrapper.find('.spinner');

  t.deepEqual(root.node.style.opacity, '1');
});

test('should fade in/out the animation when the active prop is changed', (t) => {
  const wrapper = mount(<SpinnerWrapper active />);
  const root = wrapper.find('.spinner');

  t.deepEqual(root.node.style.opacity, '1');

  wrapper.setProps({ active: false });

  t.deepEqual(root.node.style.opacity, '0');

  wrapper.setProps({ active: true });

  t.deepEqual(root.node.style.opacity, '1');
});

test('should not update the opacity of the spinner and only add the new styles', (t) => {
  const wrapper = mount(<SpinnerWrapper active />);

  wrapper.setProps({ className: 'something' });

  const div = wrapper.find('.spinner').first();

  t.true(div.prop('className').includes('something'));
});

test('should remove and add the active class if necessary', (t) => {
  const wrapper = mount(
    <Spinner
      classes={{ spinner: 'spinner' }}
      theme={{}}
      active
    />,
  );
  const root = wrapper.find('.spinner');

  wrapper.setProps({ active: false });

  wrapper.instance().anim.onfinish();

  t.deepEqual(root.prop('className').includes('active'), false);
});
