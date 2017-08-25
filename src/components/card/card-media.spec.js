import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';

import CardMedia from './card-media';

test('should render an img element', (t) => {
  const wrapper = mount(<CardMedia url="test" />);

  t.deepEqual(wrapper.find('img').length, 1);
});
