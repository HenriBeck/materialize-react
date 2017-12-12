import test from 'ava';
import React from 'react';

import { mount } from '../../../tests/helpers/enzyme';

import ExpansionPanelSummary from './expansion-panel-summary';

test('should render a div with the class of expansion-panel--summary', (t) => {
  const wrapper = mount(
    <ExpansionPanelSummary expanded>
      Text
    </ExpansionPanelSummary>,
  );

  t.deepEqual(wrapper.find('div.expansion-panel--summary').length, 1);
  t.deepEqual(wrapper.find('Icon').length, 1);
});
