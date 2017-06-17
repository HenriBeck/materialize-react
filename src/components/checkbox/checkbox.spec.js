import React from 'react';
import test from 'ava';

import Checkbox from './checkbox';
import { mount } from '../../../tests/helpers/enzyme';

const props = {
  classes: {},
  theme: {},
  checked: false,
  disabled: false,
  className: '',
  isFocused: false,
  onPress: () => {},
  id: 'id',
  children: '',
  onKeyUp: () => {},
  onKeyDown: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

test('should render a span with a role of checkbox and a Jss HoC', (t) => {
  const wrapper = mount(<Checkbox {...props} />);

  t.deepEqual(wrapper.find('Jss(Checkbox)').length, 1);
  t.deepEqual(wrapper.find({ role: 'checkbox' }).length, 1);
});

test('should set the aria-checked attribute on the root element', (t) => {
  const wrapper = mount(
    <Checkbox
      {...props}
      checked
    />,
  );
  const root = wrapper.find({ role: 'checkbox' });

  t.deepEqual(root.prop('aria-checked'), true);

  wrapper.setProps({ checked: false });

  t.deepEqual(root.prop('aria-checked'), false);
});

test('should set the aria-disabled attribute on the root element', (t) => {
  const wrapper = mount(<Checkbox{...props} />);
  const root = wrapper.find({ role: 'checkbox' });

  t.deepEqual(root.prop('aria-disabled'), false);

  wrapper.setProps({ disabled: true });

  t.deepEqual(root.prop('aria-disabled'), true);
});

test('should render different styles with different props', (t) => {
  mount(
    <Checkbox
      {...props}
      disabled
      checked
      labelPosition="left"
    />,
  );

  t.pass();
});
