import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import IconButton from './icon-button.jsx';
import {
  shallow,
  mount,
} from 'tests/enzyme';

test('should render a button and should have an Icon inside', (t) => {
  const wrapper = shallow(<IconButton icon="github" />);

  t.deepEqual(wrapper.find('button').length, 1);
  t.deepEqual(wrapper.find('Icon').length, 1);
});

test('should have a ripple inside', (t) => {
  const wrapper = shallow(<IconButton icon="github" />);

  t.deepEqual(wrapper.find('Ripple').length, 1);
});

test('should have aria-disabled and tabIndex of -1 when disabled', (t) => {
  const wrapper = shallow(
    <IconButton
      disabled
      icon="github"
    />,
  );
  const button = wrapper.find('button').first();

  t.deepEqual(button.prop('aria-disabled'), true);
  t.deepEqual(button.prop('tabIndex'), -1);
});

test('should add and remove the focus from the ripple', (t) => {
  const onFocus = sinon.spy();
  const onBlur = sinon.spy();
  const wrapper = mount(
    <IconButton
      icon="github"
      onFocus={onFocus}
      onBlur={onBlur}
    />,
  );

  wrapper.simulate('focus');

  t.deepEqual(onFocus.callCount, 1);

  wrapper.simulate('blur');

  t.deepEqual(onBlur.callCount, 1);
});
