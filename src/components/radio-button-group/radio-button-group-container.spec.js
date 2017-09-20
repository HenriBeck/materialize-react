import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';

import RadioButtonGroupContainer from './radio-button-group-container';

const props = {
  checked: 'test',
  onKeyPress: () => {},
  onFocus: () => {},
  onBlur: () => {},
  id: '',
};

test('should render a jss hoc', (t) => {
  const wrapper = shallow(
    <RadioButtonGroupContainer {...props}>
      Children
    </RadioButtonGroupContainer>,
  );
  const container = wrapper.find('RadioButtonGroupContainer').dive();

  t.deepEqual(wrapper.find('RadioButtonGroupContainer').length, 1);
  t.deepEqual(container.find('EventHandler').length, 1);
});
