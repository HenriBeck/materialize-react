import React from 'react';
import test from 'ava';

import RadioButtonContainer from './radio-button-container';
import { mount } from '../../../tests/helpers/enzyme';

const props = {
  classes: {},
  checked: 'test',
  onKeyPress: () => {},
  onFocus: () => {},
  onBlur: () => {},
  label: '',
  id: '',
};

test('should render a jss hoc', (t) => {
  const wrapper = mount(<RadioButtonContainer {...props}>Children</RadioButtonContainer>);

  t.deepEqual(wrapper.find('Jss(RadioButtonContainer)').length, 1);
});
