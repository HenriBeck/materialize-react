import React from 'react';
import test from 'ava';

import Tabs from './tabs.jsx';
import { shallow } from 'tests/enzyme';

test('should throw an error if only one child is passed', (t) => {
  t.throws(() => shallow(
    <Tabs initialTabId="tab1">
      <div />
    </Tabs>,
  ));
});

test('should throw an error if a children is not a tab', (t) => {
  t.throws(() => shallow(
    <Tabs initialTabId="tab1">
      <div />
      <div />
    </Tabs>,
  ));
});
