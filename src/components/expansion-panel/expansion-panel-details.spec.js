import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';

import ExpansionPanelDetails from './expansion-panel-details';

test('should render a div with the children', (t) => {
  const wrapper = mount(
    <ExpansionPanelDetails>
      <div>Some Text</div>
    </ExpansionPanelDetails>,
  );

  t.deepEqual(wrapper.find('div.expansion-panel--details').length, 1);
});
