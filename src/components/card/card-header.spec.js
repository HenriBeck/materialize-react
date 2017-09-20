import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import CardHeader from './card-header';

test('should render a header element with the class card--header', (t) => {
  const wrapper = mount(<CardHeader>Hello</CardHeader>);

  t.deepEqual(wrapper.find('header.card--header').length, 1);
});

test('should have a title and subtitle element', (t) => {
  const wrapper = mount(<CardHeader subtitle="Subtitle">Hello</CardHeader>);

  t.deepEqual(wrapper.find('.card--header-title').length, 1);
  t.deepEqual(wrapper.find('.card--header-subtitle').length, 1);
});

test('the root element should have class of card--header-with-avatar', (t) => {
  const wrapper = mount(<CardHeader avatar={(<span>Hello</span>)}>Hello</CardHeader>);
  const rootClassname = wrapper.find('header').prop('className');

  t.deepEqual(rootClassname.includes('card--header-with-avatar'), true);
});
