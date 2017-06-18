import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';

import CheckboxContainer from './checkbox-container';

test('should be able to change the current state by the checked get and setter', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name" />);
  const instance = wrapper.instance();

  t.deepEqual(instance.checked, false);

  instance.checked = true;

  t.deepEqual(instance.checked, true);

  instance.checked = true;
});

test('should update the state when the component receives / loses focus', (t) => {
  const wrapper = shallow(<CheckboxContainer name="name" />);

  wrapper.simulate('focus');

  t.deepEqual(wrapper.state('isFocused'), true);

  wrapper.simulate('blur');

  t.deepEqual(wrapper.state('isFocused'), false);
});
