import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';
import CardContent from './card-content';

test('should render a div with the class card--content', (t) => {
  const wrapper = mount(<CardContent>Hello</CardContent>);

  t.deepEqual(wrapper.find('.card--content').length, 1);
});
