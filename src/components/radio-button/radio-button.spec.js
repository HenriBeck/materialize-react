import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { mount } from 'enzyme';
import brcast from 'brcast';

import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

import { RadioButton } from './radio-button';

const defaultProps = {
  classes: createClassesFromStyles(RadioButton.styles, 'dark'),
  name: 'test',
  isFocused: true,
  onFocus: () => {},
  onBlur: () => {},
  createKeyDownHandler: () => {},
  onKeyUp: () => {},
};

/**
 * Render a radio button with the correct context.
 *
 * @param {Object} props - Additional props for the RadioButton.
 * @returns {Object} - Returns the enzyme wrapper.
 */
function render(props) {
  return mount(
    <RadioButton
      {...defaultProps}
      {...props}
    />,
    {
      context: {
        radioButtonGroup: {
          selected: brcast('test'),
          onChange: () => {},
        },
      },
    },
  );
}

test('should render a element with the role of radio', (t) => {
  const wrapper = render({ classes: createClassesFromStyles(RadioButton.styles, 'dark') });

  t.deepEqual(wrapper.find('span[role="radio"]').length, 1);
});

test('should set the aria-disabled prop when the radio button is disabled', (t) => {
  const wrapper = render({ disabled: true });

  t.deepEqual(wrapper.find('span[role="radio"]').prop('aria-disabled'), true);
});

test('should initially set the state on mount', (t) => {
  const wrapper = render();

  t.deepEqual(wrapper.state('selected'), 'test');
});

test('should unsubscribe to the broadcast when the component unmounts', (t) => {
  const wrapper = render();
  const context = wrapper.context('radioButtonGroup');
  const unsubscribe = sinon.spy(context.selected, 'unsubscribe');

  wrapper.unmount();

  t.deepEqual(unsubscribe.callCount, 1);
});

test('should update the local state when the broadcast updates the state', (t) => {
  const wrapper = render();
  const context = wrapper.context('radioButtonGroup');

  context.selected.setState('test2');

  t.deepEqual(wrapper.state('selected'), 'test2');
});

test('should call the onChange context when the radio button is pressed', (t) => {
  const wrapper = render();
  const context = wrapper.context('radioButtonGroup');
  const onChange = sinon.spy(context, 'onChange');

  wrapper.find('span[role="radio"]').simulate('click');

  t.deepEqual(onChange.callCount, 1);
});

