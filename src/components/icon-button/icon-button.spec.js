import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import IconButtonWrapper, { IconButton } from './icon-button';
import { mount } from '../../../tests/helpers/enzyme';

test('should render various elements and components', (t) => {
  const wrapper = mount(<IconButtonWrapper icon="github" />);

  t.deepEqual(wrapper.find('Jss(IconButton)').length, 1);
  t.deepEqual(wrapper.find({ role: 'button' }).length, 1);
  t.deepEqual(wrapper.find('Icon').length, 1);
});

test('should warn against changing the icon prop', (t) => {
  const wrapper = shallow(
    <IconButton
      classes={{}}
      theme={{}}
      icon="github"
    />,
  );

  t.throws(() => wrapper.setProps({ icon: 'some' }));
});

test('should have aria-disabled and tabIndex of -1 when disabled', (t) => {
  const wrapper = shallow(
    <IconButton
      classes={{}}
      theme={{}}
      disabled
      icon="github"
    />,
  );
  const button = wrapper.find({ role: 'button' });

  t.deepEqual(button.prop('aria-disabled'), true);
  t.deepEqual(button.prop('tabIndex'), -1);
});

test('should add and remove the focus from the ripple', (t) => {
  const onFocus = sinon.spy();
  const onBlur = sinon.spy();
  const wrapper = shallow(
    <IconButton
      classes={{}}
      theme={{}}
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

test('should only call onPress when a key event happens with a valid keyCode', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <IconButtonWrapper
      onPress={onPress}
      icon="build"
    />,
  );

  wrapper.simulate('keyDown', { keyCode: IconButton.keyCodes[0] });

  t.deepEqual(onPress.callCount, 1);
});

test('should not call onPress when a key event happens with an invalid keyCode', (t) => {
  const onPress = sinon.spy();
  const wrapper = mount(
    <IconButtonWrapper
      onPress={onPress}
      icon="build"
    />,
  );

  wrapper.simulate('keyDown', { keyCode: 0 });

  t.deepEqual(onPress.callCount, 0);
});

test('should be able to call the default event handlers', (t) => {
  IconButton.defaultProps.onFocus();
  IconButton.defaultProps.onBlur();
  IconButton.defaultProps.onPress();

  t.pass();
});
