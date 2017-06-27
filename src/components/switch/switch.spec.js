import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';
import Switch from './switch';

const defaultProps = {
  classes: {},
  theme: {},
  toggled: false,
  id: '',
  onKeyPress: () => {},
  onPress: () => {},
  children: '',
  isFocused: false,
  onFocus: () => {},
  onBlur: () => {},
  disabled: false,
  className: '',
  noink: false,
  labelPosition: 'right',
};

test('should render a Jss and a span with the role of a switch', (t) => {
  const wrapper = mount(<Switch {...defaultProps} />);

  t.deepEqual(wrapper.find('Jss(Switch)').length, 1);
  t.deepEqual(wrapper.find({ role: 'switch' }).length, 1);
});

test('should set the aria-disabled attribute based on the disabled prop', (t) => {
  const wrapper = mount(
    <Switch
      {...defaultProps}
      disabled
    />,
  );
  const root = wrapper.find({ role: 'switch' });

  t.deepEqual(root.prop('aria-disabled'), true);
});

test('should set the aria-checked attribute based on the toggled prop', (t) => {
  const wrapper = mount(
    <Switch
      {...defaultProps}
      toggled
    />,
  );
  const root = wrapper.find({ role: 'switch' });

  t.deepEqual(root.prop('aria-checked'), true);
});

test('should add the class .switch--label-left when the labelPosition is left', (t) => {
  const wrapper = mount(
    <Switch
      {...defaultProps}
      labelPosition="left"
    />,
  );
  const root = wrapper.find({ role: 'switch' });

  t.deepEqual(root.prop('className').includes('switch--label-left'), true);
});
