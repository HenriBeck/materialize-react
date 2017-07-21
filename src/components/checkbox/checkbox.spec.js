import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import CheckboxWrapper, { Checkbox } from './checkbox';
import { mount } from '../../../tests/helpers/enzyme';

const defaultProps = {
  classes: {},
  theme: { checkbox: {} },
  checked: false,
  disabled: false,
  className: '',
  isFocused: false,
  onPress: () => {},
  id: 'id',
  children: '',
  labelPosition: 'right',
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
  const spy = sinon.spy(Checkbox.prototype, 'animateCheckmark');

  mount(
    <CheckboxWrapper
      {...defaultProps}
      checked
    />,
  );

  t.true(spy.calledOnce);
});

test('should call the animateCheckmark when the checked prop changes', (t) => {
  const wrapper = mount(<CheckboxWrapper {...defaultProps} />);
  const root = () => wrapper.find({ role: 'checkbox' });

  wrapper.setProps({ checked: true });

  t.deepEqual(root().prop('aria-checked'), true);

  wrapper.setProps({ checked: false });

  t.deepEqual(root().prop('aria-checked'), false);
});

test('should set the aria-disabled attribute on the root element', (t) => {
  const wrapper = mount(<CheckboxWrapper {...defaultProps} />);

  wrapper.setProps({ disabled: true });

  t.deepEqual(wrapper.find({ role: 'checkbox' }).prop('aria-disabled'), true);
});
