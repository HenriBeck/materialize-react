import test from 'ava';
import React from 'react';

import Divider from './divider.jsx';
import { shallow } from 'tests/enzyme';

test('should render the a div', (t) => {
  const wrapper = shallow(<Divider />);

  t.deepEqual(wrapper.find('div').length, 1);
});
