import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';

import Theme from './theme';

test('should render a theme provider', (t) => {
  const wrapper = mount(
    <Theme>
      <div />
    </Theme>,
  );

  t.deepEqual(wrapper.find('ThemeProvider').length, 1);
});
