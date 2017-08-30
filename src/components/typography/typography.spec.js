import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Typography from './typography';

test('should render a span with the class of typography', (t) => {
  const wrapper = mount(<Typography typography="body1">Typo</Typography>);

  t.deepEqual(wrapper.find('span.typography').length, 1);
});

test('should add a class of typography--secondary when the secondary prop is passed', (t) => {
  const wrapper = mount(
    <Typography
      secondary
      typography="body1"
    >
      Typo
    </Typography>,
  );

  t.deepEqual(wrapper.find('.typography--secondary').length, 1);
});
