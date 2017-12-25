import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import TextField from './text-field';

const props = {
  onChange: () => {},
  value: '',
};

test('should render a input component', (t) => {
  const wrapper = mount(<TextField {...props} />);

  t.deepEqual(wrapper.find('input').length, 1);
});

test('should render a Label component when the label prop is passed', (t) => {
  const wrapper = mount(
    <TextField
      {...props}
      label="Label"
    />,
  );

  t.deepEqual(wrapper.find('Label').length, 1);
});

test('should render a Prefix component when the Prefix is passed as a child', (t) => {
  const wrapper = mount(
    <TextField {...props}>
      <TextField.Prefix>Prefix</TextField.Prefix>
    </TextField>,
  );

  t.deepEqual(wrapper.find('Prefix').length, 1);
});

test('should render a Suffix component when the Suffix is passed as a child', (t) => {
  const wrapper = mount(
    <TextField {...props}>
      <TextField.Suffix>Suffix</TextField.Suffix>
    </TextField>,
  );

  t.deepEqual(wrapper.find('Suffix').length, 1);
});

test('should focus the input when the label is clicked', (t) => {
  const wrapper = mount(
    <TextField
      {...props}
      label="Label"
    />,
  );

  wrapper
    .find('Label')
    .simulate('click');

  t.deepEqual(
    wrapper
      .find('TextField')
      .prop('isFocused'),
    true,
  );
});

test('should only add the placeholder when the label doesn\'t conflict with it', (t) => {
  const wrapper = mount(
    <TextField
      {...props}
      placeholder="Placeholder"
    />,
  );

  t.deepEqual(
    wrapper
      .find('input')
      .prop('placeholder'),
    'Placeholder',
  );
});
