import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Label from './label';

test('should render a label tag with the children inside', (t) => {
  const wrapper = mount(<Label htmlFor="some">Content</Label>);

  t.deepEqual(wrapper.find('Jss(Label)').length, 1);
  t.deepEqual(wrapper.find('label').length, 1);
  t.deepEqual(wrapper.find('label').text(), 'Content');
});
