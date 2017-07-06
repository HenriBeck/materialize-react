import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';

import RadioButtonContainer from './radio-button-container';

const props = {
  checked: 'test',
  onKeyPress: () => {},
  onFocus: () => {},
  onBlur: () => {},
  label: '',
  id: '',
};

test('should render a jss hoc', (t) => {
  const wrapper = shallow(<RadioButtonContainer {...props}>Children</RadioButtonContainer>);
  const containerWrapper = wrapper.find('RadioButtonContainer').dive();
  const className = containerWrapper.find('EventHandler').prop('className');

  t.deepEqual(wrapper.find('RadioButtonContainer').length, 1);
  t.true(className.includes('radio-button-group'));
});
