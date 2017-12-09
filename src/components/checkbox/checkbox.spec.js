import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Checkbox from './checkbox';

const props = {
  checked: false,
  onChange: () => {},
};

test('should render a span with a role of checkbox and a Jss HoC', (t) => {
  const wrapper = mount(<Checkbox {...props} />, { type: 'dark' });

  t.deepEqual(wrapper.find('Jss(Checkbox)').length, 1);
  t.deepEqual(wrapper.find('span[role="checkbox"]').length, 1);
});

test('should change the animationName when the checked prop changes', (t) => {
  const wrapper = mount(
    <Checkbox
      {...props}
      checked
    />,
  );

  const style = wrapper.find('.checkbox--checkmark').prop('style');

  t.deepEqual(style.animationName, 'checkbox--animate-in');
});

test('should set the aria-disabled attribute on the root element', (t) => {
  const wrapper = mount(
    <Checkbox
      {...props}
      disabled
    />,
  );

  t.deepEqual(wrapper.find('span[role="checkbox"][aria-disabled=true]').length, 1);
});
