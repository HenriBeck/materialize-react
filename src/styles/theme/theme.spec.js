import React from 'react';
import test from 'ava';
import is from 'is_js';
import { mount } from 'enzyme';

import Theme, { compileTheme } from './theme';

test('should render a Jss Hoc and a Theme Provider', (t) => {
  const wrapper = mount(
    <Theme>
      <div>
        Children
      </div>
    </Theme>,
  );

  t.deepEqual(wrapper.find('Jss(Theme)').length, 1);
  t.deepEqual(wrapper.find('ThemeProvider').length, 1);
});

test('should compile a theme', (t) => {
  const theme = compileTheme({}, { button: () => {} });

  t.true(is.json(theme));
});
