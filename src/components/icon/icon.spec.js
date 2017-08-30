import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Icon from './icon';

test('should return an i tag if the icon isn\'t a custom icon', (t) => {
  const wrapper = mount(<Icon icon="github" />);

  t.deepEqual(wrapper.find('i').length, 1);
});

test('should have the disabledColor of the theme when the icon is disabled', (t) => {
  const wrapper = mount(
    <Icon
      disabled
      icon="github"
    />,
  );
  const element = wrapper.find('i');

  t.true(element.prop('aria-disabled'));
});
