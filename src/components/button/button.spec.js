import test from 'ava';
import React from 'react';

import { mount } from '../../../tests/helpers/enzyme';

import Button from './button';

test('should render the button', (t) => {
  const wrapper = mount(<Button />, { type: 'dark' });

  t.deepEqual(wrapper.find('Jss(Button)').length, 1);
  t.deepEqual(wrapper.find('span[role="button"]').length, 1);
  t.deepEqual(wrapper.find('Ripple').length, 1);
});

test('should have tabIndex -1 when the button is disabled', (t) => {
  const wrapper = mount(<Button disabled />);
  const button = wrapper.find({ role: 'button' });

  t.deepEqual(button.prop('tabIndex'), -1);
  t.deepEqual(button.prop('aria-disabled'), true);
});

test('should change the state when an interaction happens', (t) => {
  const wrapper = mount(<Button raised />);

  wrapper.find('span[role="button"]').simulate('click');

  t.deepEqual(
    wrapper
      .find('span[role="button"]')
      .prop('aria-pressed'),
    true,
  );

  wrapper.find('span[role="button"]').simulate('mouseUp');

  t.deepEqual(
    wrapper
      .find('span[role="button"]')
      .prop('aria-pressed'),
    false,
  );
});

test('should warn when the user changes the raised prop', (t) => {
  const wrapper = mount(<Button />);

  t.throws(() => wrapper.setProps({ raised: true }));
});
