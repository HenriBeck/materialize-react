import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';

import CheckboxWrapper, { Checkbox } from './checkbox';
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
  labelPosition: 'right',
  onKeyPress: () => {},
  onFocus: () => {},
  onBlur: () => {},
};

test('should render a span with a role of checkbox and a Jss HoC', (t) => {
  const wrapper = mount(<CheckboxWrapper {...props} />);

  t.deepEqual(wrapper.find('Jss(Checkbox)').length, 1);
  t.deepEqual(wrapper.find({ role: 'checkbox' }).length, 1);
});

test('should set the aria-checked attribute on the root element', (t) => {
  const wrapper = shallow(
    <Checkbox
      {...props}
      checked
    />,
  );
  const root = wrapper.find({ role: 'checkbox' });

  t.deepEqual(root.prop('aria-checked'), true);
});

test('should set the aria-disabled attribute on the root element', (t) => {
  const wrapper = shallow(
    <Checkbox
      {...props}
      disabled
    />,
  );
  const root = wrapper.find({ role: 'checkbox' });

  wrapper.setProps({ disabled: true });

  t.deepEqual(root.prop('aria-disabled'), true);
});
