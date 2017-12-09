import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import IconButton from './icon-button';

test('should render various elements and components', (t) => {
  const wrapper = mount(<IconButton icon="github" />);

  t.deepEqual(wrapper.find('Jss(IconButton)').length, 1);
  t.deepEqual(wrapper.find('span[role="button"]').length, 1);
  t.deepEqual(wrapper.find('Icon').length, 1);
});

test('should have aria-disabled and tabIndex of -1 when disabled', (t) => {
  const wrapper = mount(
    <IconButton
      disabled
      icon="github"
    />,
  );
  const button = wrapper.find('span.icon-button');

  t.deepEqual(button.prop('aria-disabled'), true);
  t.deepEqual(button.prop('tabIndex'), -1);
});

test('should warn against changing the icon prop', (t) => {
  const wrapper = mount(<IconButton icon="github" />);

  t.throws(() => wrapper.setProps({ icon: 'some' }));
});
