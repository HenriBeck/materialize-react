import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';

import ExpansionPanelActions from './expansion-panel-actions';

test('should render a div with the children', (t) => {
  const wrapper = mount(
    <ExpansionPanelActions>
      <div>Some Text</div>
    </ExpansionPanelActions>,
  );

  t.deepEqual(wrapper.find('div.expansion-panel--actions').length, 1);
});
