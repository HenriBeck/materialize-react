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
  const containerWrapper = wrapper.find('RadioButtonContainer').dive();
  const className = containerWrapper.find('EventHandler').prop('className');

  t.deepEqual(wrapper.find('RadioButtonContainer').length, 1);
  t.true(className.includes('radio-button-group'));
});
