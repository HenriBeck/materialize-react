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

  t.deepEqual(instance.colors, {
    bgColor: theme.disabledBgColor,
    borderColor: theme.disabledBorderColor,
  });

  wrapper.setProps({ checked: true });

  t.deepEqual(instance.colors, {
    bgColor: theme.disabledCheckedBgColor,
    borderColor: theme.disabledBorderColor,
  });

  wrapper.setProps({ disabled: false });

  t.deepEqual(instance.colors, {
    bgColor: theme.checkedBgColor,
    borderColor: theme.checkedBorderColor,
  });

  wrapper.setProps({ checked: false });

  t.deepEqual(instance.colors, {
    bgColor: theme.uncheckedBgColor,
    borderColor: theme.uncheckedBorderColor,
  });
});

test('should update the checkmark color to the parent color when the checkbox is disabled', (t) => {
  const wrapper = mount(
    <Checkbox
      disabled
      checked={false}
    />,
  );
  const instance = wrapper.instance();
  const checkmark = wrapper.find('.checkbox--checkmark').first();

  instance.parentBgColor = '#ffffff';
  instance.updateCheckmarkColor();

  t.deepEqual(checkmark.node.style['border-color'], instance.parentBgColor);
});
