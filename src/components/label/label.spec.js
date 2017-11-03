import React from 'react';
import test from 'ava';
import is from 'is_js';

import { mount } from '../../../tests/helpers/enzyme';
import Checkbox from '../checkbox';

import Label from './label';

test('should render a label tag with the children inside', (t) => {
  const wrapper = mount(<Label>Content</Label>);

  t.deepEqual(wrapper.find('Jss(Label)').length, 1);
  t.deepEqual(wrapper.find('label').length, 1);
  t.deepEqual(wrapper.find('label').text(), 'Content');
});

test('should have a for attribute', (t) => {
  const wrapper = mount(<Label>Content</Label>);

  t.true(is.string(wrapper.find('label').prop('htmlFor')));
});

test('should add an id prop to a checkbox', (t) => {
  const wrapper = mount(
    <Label>
      Content

      <Checkbox checked />
    </Label>,
  );

  t.deepEqual(
    wrapper
      .find('Checkbox')
      .prop('id'),
    wrapper
      .find('label')
      .prop('htmlFor'),
  );
});

test('should only add an id prop to the first checkbox', (t) => {
  const wrapper = mount(
    <Label>
      Content

      <Checkbox checked />

      <Checkbox checked={false} />
    </Label>,
  );

  t.deepEqual(
    wrapper
      .find('Checkbox')
      .first()
      .prop('id'),
    wrapper
      .find('label')
      .prop('htmlFor'),
  );

  t.true(
    is.undefined(
      wrapper
        .find('Checkbox')
        .last()
        .prop('id'),
    ),
  );
});
