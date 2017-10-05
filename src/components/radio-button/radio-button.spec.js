import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import RadioButton from './radio-button';

const props = {
  checked: false,
  isFocused: false,
  onPress: () => {},
};

test('should render a jss hoc and a element with the role of radio', (t) => {
  const wrapper = mount(<RadioButton {...props}>Label</RadioButton>);

  t.deepEqual(wrapper.find('Jss(RadioButton)').length, 1);
  t.deepEqual(wrapper.find('span[role="radio"]').length, 1);
});

test('should have a class of radio-button--label-left when the labelPosition is left', (t) => {
  const wrapper = mount(
    <RadioButton
      labelPosition="left"
      {...props}
    >
      Label
    </RadioButton>,
    { themeType: 'dark' },
  );

  t.deepEqual(wrapper.find('span.radio-button--label-left').length, 1);
});
