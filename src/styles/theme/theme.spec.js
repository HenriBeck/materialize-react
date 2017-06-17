import React from 'react';
import test from 'ava';
import is from 'is_js';
import {
  shallow,
  mount,
} from 'enzyme';

import ThemeWrapper, { compileTheme, Theme } from './theme';

test('should render a jss hoc', (t) => {
  const wrapper = mount(<ThemeWrapper />);

  t.deepEqual(wrapper.find('Jss(Theme)').length, 1);
});

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
