import React from 'react';
import test from 'ava';
import is from 'is_js';
import { shallow } from 'enzyme';

import Theme, { compileTheme } from './theme';

test('should just render a Jss Provider', (t) => {
  const wrapper = shallow(
    <Theme>
      <div>
        Children
      </div>
    </Theme>,
  );

  t.deepEqual(wrapper.find('JssProvider').length, 1);
});

test('should compile a theme', (t) => {
  const theme = compileTheme({}, { button: () => {} });

  t.true(is.json(theme));
});
