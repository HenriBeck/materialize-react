import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import { mount } from '../../../tests/helpers/enzyme';
import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

import CheckboxWrapper, { Checkbox } from './checkbox';

const props = {
  classes: createClassesFromStyles(Checkbox.styles),
  checked: false,
  onChange: () => {},
};

test('should render a span with a role of checkbox and a Jss HoC', (t) => {
  const wrapper = mount(<CheckboxWrapper {...props} />, { type: 'dark' });

  t.deepEqual(wrapper.find('Jss(Checkbox)').length, 1);
  t.deepEqual(wrapper.find('span[role="checkbox"]').length, 1);
});

test('should change the animationName when the checked prop changes', (t) => {
  const wrapper = mount(<Checkbox {...props} />);

  wrapper.setProps({ checked: true });

  const style = wrapper.find('.checkbox--checkmark').prop('style');

  t.deepEqual(style.animationName, 'checkbox--animate-in');
});

test('should set the aria-disabled attribute on the root element', (t) => {
  const wrapper = mount(
    <Checkbox
      {...props}
      disabled
    />,
  );

  t.deepEqual(wrapper.find('span[role="checkbox"][aria-disabled=true]').length, 1);
});

test('should call the onChange handler when the checkbox is pressed', (t) => {
  const onChange = sinon.spy();
  const wrapper = mount(
    <Checkbox
      {...props}
      onChange={onChange}
    />,
  );
  const onPress = wrapper.find('EventHandler[role="checkbox"]').prop('onPress');

  onPress();

  t.deepEqual(onChange.callCount, 1);
});

test('should call the onChange handler when a key is pressed', (t) => {
  const onChange = sinon.spy();
  const wrapper = mount(
    <Checkbox
      {...props}
      onChange={onChange}
    />,
  );
  const onKeyPress = wrapper.find('EventHandler[role="checkbox"]').prop('onKeyPress');

  onKeyPress({ keyCode: Checkbox.keyCodes[0] });

  t.deepEqual(onChange.callCount, 1);
});

test('should not call the onChange handler when no key code is specified', (t) => {
  const onChange = sinon.spy();
  const wrapper = mount(
    <Checkbox
      {...props}
      onChange={onChange}
    />,
  );
  const onKeyPress = wrapper.find('EventHandler[role="checkbox"]').prop('onKeyPress');

  onKeyPress({});

  t.deepEqual(onChange.callCount, 0);
});

test('should change the state when the component get\'s focused', (t) => {
  const wrapper = mount(<Checkbox {...props} />);
  const onFocus = wrapper.find('EventHandler[role="checkbox"]').prop('onFocus');

  onFocus();

  t.deepEqual(wrapper.state('isFocused'), true);
});

test('should change the state when the component get\'s focused and blurred', (t) => {
  const wrapper = mount(<Checkbox {...props} />);
  const onFocus = wrapper.find('EventHandler[role="checkbox"]').prop('onFocus');

  onFocus();

  const onBlur = wrapper.find('EventHandler[role="checkbox"]').prop('onBlur');

  onBlur();

  t.deepEqual(wrapper.state('isFocused'), false);
});
