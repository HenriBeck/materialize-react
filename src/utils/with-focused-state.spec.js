import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import is from 'is_js';

import withFocusedState from './with-focused-state';

const Component = props => (
  <div // eslint-disable-line jsx-a11y/no-static-element-interactions
    onFocus={props.onFocus}
    onBlur={props.onBlur}
  />
);

Component.propTypes = {
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

test('should compute the display name', (t) => {
  const WrappedComponent = withFocusedState(Component);
  const wrapper = mount(<WrappedComponent />);

  t.deepEqual(wrapper.find('WithFocusedState(Component)').length, 1);
});

test('should pass the focus and blur event handlers and the isFocused state as props', (t) => {
  const WrappedComponent = withFocusedState(Component);
  const wrapper = mount(<WrappedComponent />);
  const props = wrapper.find('Component').props();

  t.true(is.function(props.onFocus));
  t.true(is.function(props.onBlur));
  t.true(is.boolean(props.isFocused));
});

test('should set the isFocused state to true when the focus event handler is called', (t) => {
  const WrappedComponent = withFocusedState(Component);
  const wrapper = mount(<WrappedComponent />);

  wrapper.find('div').simulate('focus');

  t.deepEqual(
    wrapper
      .find('Component')
      .prop('isFocused'),
    true,
  );
});

test('should set the isFocused state to false when the blur event handler is called', (t) => {
  const WrappedComponent = withFocusedState(Component);
  const wrapper = mount(<WrappedComponent />);

  wrapper.find('div').simulate('focus');
  wrapper.find('div').simulate('blur');

  t.deepEqual(
    wrapper
      .find('Component')
      .prop('isFocused'),
    false,
  );
});

