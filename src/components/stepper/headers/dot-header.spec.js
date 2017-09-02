import React from 'react';
import test from 'ava';

import { mount } from '../../../../tests/helpers/enzyme';

import DotHeader from './dot-header';

const props = {
  sections: [{ name: '1' }, { name: '2' }, { name: '3' }],
  currentSection: 1,
  back: () => {},
  forward: () => {},
};

test('should render a Jss HoC and a HeaderWithButtons', (t) => {
  const wrapper = mount(<DotHeader {...props} />);

  t.deepEqual(wrapper.find('Jss(DotHeader)').length, 1);
});

test('should render 3 dots', (t) => {
  const wrapper = mount(<DotHeader {...props} />);
  const dots = wrapper.find('.stepper--header-dots-dot');

  t.deepEqual(dots.length, 3);
});
