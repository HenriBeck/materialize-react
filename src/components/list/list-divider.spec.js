import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';

import ListDivider from './list-divider';

test('should render a li and a Divider inside', (t) => {
  const wrapper = shallow(<ListDivider />).dive();
  const li = wrapper.find('li');

  t.deepEqual(li.length, 1);
  t.deepEqual(li.find('Jss(Divider)').length, 1);
});

test('should add a class of list--divider-inset when the inset prop is passed', (t) => {
  const wrapper = shallow(<ListDivider inset />).dive();
  const li = wrapper.find('li');

  t.deepEqual(li.prop('className').includes('list--divider-inset'), true);
});
