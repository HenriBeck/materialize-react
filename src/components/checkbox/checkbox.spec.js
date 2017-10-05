import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import CheckboxWrapper from './checkbox';

const props = {
  checked: false,
  disabled: false,
  className: '',
  isFocused: false,
  id: 'id',
  children: '',
  labelPosition: 'right',
  onPress: () => {},
  onKeyPress: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

test('should render a span with a role of checkbox and a Jss HoC', (t) => {
  const wrapper = mount(<CheckboxWrapper {...props} />, { themeType: 'dark' });

  t.deepEqual(wrapper.find('Jss(Checkbox)').length, 1);
  t.deepEqual(wrapper.find('span[role="checkbox"]').length, 1);
});

test('should change the animationName when the checked prop changes', (t) => {
  const wrapper = mount(<CheckboxWrapper {...props} />);
  const checkmark = () => wrapper.find('.checkbox--checkmark');

  wrapper.setProps({ checked: true });

  t.deepEqual(checkmark().prop('style').animationName, 'checkbox--animate-in');

  wrapper.setProps({ checked: false });

  t.deepEqual(checkmark().prop('style').animationName, 'checkbox--animate-out');
});

test('should set the aria-disabled attribute on the root element', (t) => {
  const wrapper = mount(<CheckboxWrapper {...props} />);

  wrapper.setProps({ disabled: true });

  t.deepEqual(wrapper.find('span[role="checkbox"][aria-disabled=true]').length, 1);
});

test('should add the class checkbox--label-left when the labelPosition is left', (t) => {
  const wrapper = mount(<CheckboxWrapper {...props} />);

  wrapper.setProps({ labelPosition: 'left' });

  t.deepEqual(wrapper.find('span[role="checkbox"].checkbox--label-left').length, 1);
});
