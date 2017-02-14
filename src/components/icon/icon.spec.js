import React from 'react';
import test from 'ava';

import Icon from './icon.jsx';
import { shallow } from 'tests/enzyme';

test('should return an i tag if the icon isn\'t a custom icon', (t) => {
  const wrapper = shallow(<Icon icon="github" />);

  t.deepEqual(wrapper.find('i').length, 1);
});

test('should have the iconColor of the theme when the icon isn\'t disabled', (t) => {
  const wrapper = shallow(<Icon icon="github" />);
  const iconProps = wrapper
    .find('i')
    .first()
    .props();
  const theme = wrapper.context('theme');

  t.deepEqual(iconProps.style.color, theme.icon.color);
});

test('should have the disabledColor of the theme when the icon isn\'t disabled', (t) => {
  const wrapper = shallow(
    <Icon
      disabled
      icon="github"
    />,
  );
  const iconProps = wrapper
    .find('i')
    .first()
    .props();
  const theme = wrapper.context('theme');

  t.deepEqual(iconProps.style.color, theme.icon.disabledColor);
});
