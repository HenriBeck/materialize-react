import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';

import Layout from './layout';

test('should render a div with the class of layout', (t) => {
  const wrapper = mount(<Layout>Test</Layout>);

  t.deepEqual(wrapper.find('div.layout').length, 1);
});

test('should render a div with the class of layout--inline', (t) => {
  const wrapper = mount(<Layout inline>Test</Layout>);

  t.deepEqual(wrapper.find('div.layout.layout--inline').length, 1);
});

test('should render a div with the class of layout--reverse', (t) => {
  const wrapper = mount(<Layout reverse>Test</Layout>);

  t.deepEqual(wrapper.find('div.layout.layout--reverse').length, 1);
});
