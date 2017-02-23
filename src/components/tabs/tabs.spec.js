import React from 'react';
import test from 'ava';

import Tabs from './tabs.jsx';
import { shallow } from 'tests/enzyme';

test('should throw an error if no children are passed', (t) => {
  t.throws(() => shallow(<Tabs />));
});

test('should throw an error if a children is not a tab', (t) => {
  t.throws(() => shallow(
    <Tabs>
      <div />
      <div />
    </Tabs>,
  ));
});
