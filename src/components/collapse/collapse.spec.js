import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';

import Collapse from './collapse';

test('should render a div', (t) => {
  const wrapper = mount(<Collapse isOpen={false}>Some Content</Collapse>);

  wrapper.setProps({ isOpen: true });

  t.deepEqual(wrapper.find('div').length, 1);
});

test('should set the height explicitly when we change the isOpen prop', (t) => {
  const wrapper = mount(<Collapse isOpen>Some Content</Collapse>);

  wrapper.setProps({ isOpen: false });

  t.deepEqual(
    wrapper
      .find('div')
      .getDOMNode()
      .style
      .height,
    '0px',
  );
});

test('should not update the height when the isOpen prop is not changed', (t) => {
  const wrapper = mount(<Collapse isOpen>Some Content</Collapse>);
  const prevHeight = wrapper
    .find('div')
    .getDOMNode()
    .style
    .height;

  wrapper.setProps({ className: 'test' });

  t.deepEqual(
    wrapper
      .find('div')
      .getDOMNode()
      .style
      .height,
    prevHeight,
  );
});

test('should not update the height when the isOpen is not changed', (t) => {
  const wrapper = mount(<Collapse isOpen>Some Content</Collapse>);

  wrapper
    .find('div')
    .simulate('transitionEnd');

  t.deepEqual(
    wrapper
      .find('div')
      .getDOMNode()
      .style
      .overflow,
    'visible',
  );
});

test('should set the overflow to visible when the element has finished transitioning', (t) => {
  const wrapper = mount(<Collapse isOpen>Some Content</Collapse>);

  wrapper
    .find('div')
    .simulate('transitionEnd');

  t.deepEqual(
    wrapper
      .find('div')
      .getDOMNode()
      .style
      .overflow,
    'visible',
  );
});
