import React from 'react';
import test from 'ava';

import Label from './label';
import { mount } from '../../../tests/helpers/enzyme';

test('should render a label tag with the children inside', (t) => {
  const wrapper = mount(<Label for="some">Content</Label>);

  t.deepEqual(wrapper.find('Jss(Label)').length, 1);
  t.deepEqual(wrapper.find('label').length, 1);
  t.deepEqual(wrapper.find('label').text(), 'Content');
});

test('should render different styles when disabled', (t) => {
  const wrapper = mount(
    <Label
      for="some"
      disabled
    >
      Content
    </Label>,
  );
  const color = wrapper.find('Label').prop('sheet').rules.map.label.renderable.style.color;
  const theme = wrapper.context('theme').label;

  t.deepEqual(color, theme.disabledColor);
});
