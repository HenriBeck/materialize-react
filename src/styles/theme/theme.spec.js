import React from 'react';
import test from 'ava';
import is from 'is_js';
import { shallow } from 'enzyme';

import Theme, { compileTheme } from './theme';

test('should just render the children passed to theme', (t) => {
  const wrapper = shallow(
    <Theme>
      <div>
        Children
      </div>
    </Theme>,
  );

  t.deepEqual(wrapper.text(), 'Children');
});

test('should have a theme object as the context', (t) => {
  const instance = shallow(
    <Theme>
      <div>
        Children
      </div>
    </Theme>,
  ).instance();

  t.true(is.json(instance.getChildContext().theme));
});

test('should compile a theme', (t) => {
  const theme = compileTheme({}, { button: () => {} });

  t.true(is.json(theme));
});
