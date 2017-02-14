import React from 'react';
import test from 'ava';

import Checkbox from './checkbox.jsx';
import { mount } from 'tests/enzyme';

test('should render a span with a span inside', (t) => {
  const wrapper = mount(
    <Checkbox
      checked={false}
      disabled={false}
    />,
  );
  const spans = wrapper.find('span');
  const children = spans.first().children();

  t.deepEqual(spans.length, 2);
  t.deepEqual(children.find('span').length, 1);
});

test('should set the initial border color on mount', (t) => {
  const wrapper = mount(
    <Checkbox
      checked
      disabled
    />,
  );
  const instance = wrapper.instance();

  t.deepEqual(instance.lastBorderColor, instance.colors.borderColor);
});

test('should compute the colors of the checkbox based on the state', (t) => {
  const wrapper = mount(
    <Checkbox
      checked={false}
      disabled
    />,
  );
  const instance = wrapper.instance();
  const theme = instance.theme;

  // Check if the colors are correct when the checkbox is disabled but not checked
  t.deepEqual(instance.colors, {
    bgColor: theme.disabledBackgroundColor,
    borderColor: theme.disabledBorderColor,
  });

  // Make the checkbox checked
  wrapper.setProps({ checked: true });

  // Check if the colors are correct when the checkbox is checked and disabled
  t.deepEqual(instance.colors, {
    bgColor: theme.disabledCheckedBackgroundColor,
    borderColor: theme.disabledBorderColor,
  });

  wrapper.setProps({ disabled: false });

  // Check if the colors are correct when the checkbox is checked but not disabled
  t.deepEqual(instance.colors, {
    bgColor: theme.checkedBackgroundColor,
    borderColor: theme.checkedBorderColor,
  });

  // Make the checkbox unchecked
  wrapper.setProps({ checked: false });

  // Check if the colors are correct when the checkbox isn't checked and disabled
  t.deepEqual(instance.colors, {
    bgColor: theme.uncheckedBackgroundColor,
    borderColor: theme.uncheckedBorderColor,
  });
});
