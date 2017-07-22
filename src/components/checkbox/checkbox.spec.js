import React from 'react';
import test from 'ava';

import CheckboxWrapper from './checkbox';
import { mount } from '../../../tests/helpers/enzyme';

const defaultProps = {
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
  const wrapper = mount(<CheckboxWrapper {...defaultProps} />);

  t.deepEqual(wrapper.find('Jss(Checkbox)').length, 1);
  t.deepEqual(wrapper.find({ role: 'checkbox' }).length, 1);
});

test('should animate the checkmark when the checked prop is initially passed', (t) => {
  const wrapper = mount(
    <CheckboxWrapper
      {...defaultProps}
      checked
    />,
  );
  const checkmark = wrapper.find('.checkbox--checkmark').node;

  t.deepEqual(checkmark.style.animationName, 'checkbox--animate-in');
});

test('should change the animationName when the checked prop changes', (t) => {
  const wrapper = mount(<CheckboxWrapper {...defaultProps} />);
  const checkmark = () => wrapper.find('.checkbox--checkmark').node;

  wrapper.setProps({ checked: true });

  t.deepEqual(checkmark().style.animationName, 'checkbox--animate-in');

  wrapper.setProps({ checked: false });

  t.deepEqual(checkmark().style.animationName, 'checkbox--animate-out');
});

test('should set the aria-disabled attribute on the root element', (t) => {
  const wrapper = mount(<CheckboxWrapper {...defaultProps} />);

  wrapper.setProps({ disabled: true });

  t.deepEqual(wrapper.find({ role: 'checkbox' }).prop('aria-disabled'), true);
});

test('should add the class checkbox--label-left when the labelPosition is left', (t) => {
  const wrapper = mount(<CheckboxWrapper {...defaultProps} />);

  wrapper.setProps({ labelPosition: 'left' });

  const className = wrapper.find({ role: 'checkbox' }).prop('className');

  t.deepEqual(className.includes('checkbox--label-left'), true);
});
