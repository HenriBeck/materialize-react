import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import { mount } from '../../../tests/helpers/enzyme';

import Switch from './switch';

const props = {
  toggled: false,
  onChange: () => {},
};

test('should render a Switch component and a span with the role of switch', (t) => {
  const wrapper = mount(<Switch {...props} />);

  t.deepEqual(wrapper.find('Switch').length, 1);
  t.deepEqual(wrapper.find('span[role="switch"]').length, 1);
});

test('should have the aria-disabled prop set to true when disabled', (t) => {
  const wrapper = mount(
    <Switch
      {...props}
      disabled
    />,
    { type: 'dark' },
  );

  t.deepEqual(wrapper.find('span[aria-disabled=true]').length, 1);
});

test('should call the onChange prop when the switch is clicked', (t) => {
  const onChange = sinon.spy();
  const wrapper = mount(
    <Switch
      {...props}
      onChange={onChange}
    />,
  );

  wrapper.find('.switch--thumb').simulate('click');

  t.deepEqual(onChange.callCount, 1);
});
