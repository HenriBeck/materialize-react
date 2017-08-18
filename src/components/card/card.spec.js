import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';
import Card from './card';

test('should render a div with a class of card', (t) => {
  const wrapper = mount(<Card>Hello</Card>);

  t.deepEqual(wrapper.find('.card').length, 1);
});
