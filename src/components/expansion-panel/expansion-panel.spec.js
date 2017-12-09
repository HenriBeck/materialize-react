import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import ExpansionPanel from './expansion-panel';

const onChange = () => true;

test('should render the Summary and a Collapse component', (t) => {
  const wrapper = mount(
    <ExpansionPanel
      expanded
      onChange={onChange}
    >
      <ExpansionPanel.Summary>Test</ExpansionPanel.Summary>

      <ExpansionPanel.Details>Test</ExpansionPanel.Details>
    </ExpansionPanel>,
  );

  t.deepEqual(wrapper.find('ExpansionPanelSummary').length, 1);
  t.deepEqual(wrapper.find('Collapse').length, 1);
  t.deepEqual(wrapper.find('ExpansionPanelDetails').length, 1);
});
