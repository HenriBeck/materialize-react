import test from 'ava';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { mount } from '../../../tests/helpers/enzyme';
import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

import ButtonWrapper, { Button } from './button';

const classes = createClassesFromStyles(Button.styles);

test('should render the button', (t) => {
  const wrapper = mount(<ButtonWrapper />);

  t.deepEqual(wrapper.find('Jss(Button)').length, 1);
  t.deepEqual(wrapper.find({ role: 'button' }).length, 1);
});

test('should warn when the user changes the raised prop', (t) => {
  const wrapper = shallow(
    <Button
      raised
      classes={classes}
    />,
  );

  t.throws(() => wrapper.setProps({ raised: false }));
});

test('should have tabIndex -1 when the button is disabled', (t) => {
  const wrapper = shallow(
    <Button
      disabled
      classes={classes}
    />,
  );
  const button = wrapper.find({ role: 'button' });

  t.deepEqual(button.prop('tabIndex'), -1);
  t.deepEqual(button.prop('aria-disabled'), true);
});

test('should change the state when an interaction happens', (t) => {
  const wrapper = shallow(<Button classes={classes} />);
  const instance = wrapper.instance();

  instance.handlePress();

  t.deepEqual(wrapper.state('pressed'), true);

  instance.handleRelease();

  t.deepEqual(wrapper.state('pressed'), false);
});

test('should have a Ripple inside the button', (t) => {
  const wrapper = mount(<Button classes={classes} />);

  t.deepEqual(wrapper.find('RippleContainer').length, 1);
});

test('should not call the onPress prop when no key code was passed to the handler', (t) => {
  const onPress = sinon.spy();
  const wrapper = shallow(
    <Button
      classes={classes}
      onPress={onPress}
    />,
  );
  const instance = wrapper.instance();

  instance.handleKeyPress({});

  t.deepEqual(onPress.callCount, 0);
});

test('should call the onPress prop when a valid key code was passed to the handler', (t) => {
  const onPress = sinon.spy();
  const wrapper = shallow(
    <Button
      classes={classes}
      onPress={onPress}
    />,
  );
  const instance = wrapper.instance();

  instance.handleKeyPress({ keyCode: Button.keyCodes[0] });

  t.deepEqual(onPress.callCount, 1);
});

test('should handle onFocus and onBlur events and add focus to the element', (t) => {
  const wrapper = shallow(<Button classes={classes} />);

  wrapper.simulate('focus');

  t.deepEqual(wrapper.state('isFocused'), true);

  wrapper.simulate('blur');

  t.deepEqual(wrapper.state('isFocused'), false);
});
