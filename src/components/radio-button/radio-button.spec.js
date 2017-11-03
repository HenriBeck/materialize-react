import React from 'react';
import test from 'ava';
import brcast from 'brcast';
import sinon from 'sinon';
import { mount } from 'enzyme';

import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

import { RadioButton } from './radio-button';

const props = {
  classes: createClassesFromStyles(RadioButton.styles),
  name: 'test',
};

/**
 * Simulate a context of a radio button group.
 *
 * @returns {Object} - Returns the simulated context.
 */
function createContext() {
  return {
    radioButtonGroup: {
      selected: brcast('test'),
      onChange: () => {},
    },
  };
}

test('should render a element with the role of radio', (t) => {
  const wrapper = mount(<RadioButton {...props} />, { context: createContext() });

  t.deepEqual(wrapper.find('span[role="radio"]').length, 1);
});

test('should set the aria-disabled prop when the radio button is disabled', (t) => {
  const wrapper = mount(
    <RadioButton
      disabled
      name="test"
      classes={createClassesFromStyles(RadioButton.styles, 'dark')}
    />,
    { context: createContext() },
  );

  t.deepEqual(wrapper.find('span[role="radio"]').prop('aria-disabled'), true);
});

test('should update the state when the broadcast get\'s a new value', (t) => {
  const context = createContext();
  const wrapper = mount(<RadioButton {...props} />, { context });

  context.radioButtonGroup.selected.setState('test2');

  t.deepEqual(wrapper.state('selected'), 'test2');
});

test('should unsubscribe when the component unmounts', (t) => {
  const context = createContext();
  const spy = sinon.spy(context.radioButtonGroup.selected, 'unsubscribe');
  const wrapper = mount(<RadioButton {...props} />, { context });

  wrapper.unmount();

  t.deepEqual(spy.callCount, 1);
});

test('should call the onChange context when the radio button get\'s pressed', (t) => {
  const context = createContext();
  const spy = sinon.spy(context.radioButtonGroup, 'onChange');
  const wrapper = mount(<RadioButton {...props} />, { context });
  const instance = wrapper.instance();

  instance.handlePress();

  t.deepEqual(spy.callCount, 1);
});

test('should update the isFocused state when the radio button get\'s focused', (t) => {
  const context = createContext();
  const wrapper = mount(<RadioButton {...props} />, { context });
  const instance = wrapper.instance();

  instance.handleFocus();

  t.deepEqual(wrapper.state('isFocused'), true);
});

test('should update the isFocused state when the radio button looses focus', (t) => {
  const context = createContext();
  const wrapper = mount(<RadioButton {...props} />, { context });
  const instance = wrapper.instance();

  instance.handleFocus();

  instance.handleBlur();

  t.deepEqual(wrapper.state('isFocused'), false);
});

test('should call the onChange context when a key with a valid key code is pressed', (t) => {
  const context = createContext();
  const spy = sinon.spy(context.radioButtonGroup, 'onChange');
  const wrapper = mount(<RadioButton {...props} />, { context });
  const instance = wrapper.instance();

  instance.handleKeyPress({ keyCode: RadioButton.changeOnKeyCodes[0] });

  t.deepEqual(spy.callCount, 1);

  instance.handleKeyPress({});

  t.deepEqual(spy.callCount, 1);
});
