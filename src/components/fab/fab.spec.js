import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import FabWrapper, { Fab } from './fab';
import { mount } from '../../../tests/helpers/enzyme';

test('should render a button', (t) => {
  const wrapper = mount(<FabWrapper icon="build" />);

  t.deepEqual(wrapper.find({ role: 'button' }).length, 1);
  t.deepEqual(wrapper.find('Jss(Fab)').length, 1);
});

test('should have a ripple inside', (t) => {
  const wrapper = mount(<FabWrapper icon="build" />);

  t.deepEqual(wrapper.find('Ripple').length, 1);
});

test('should animate the fab in', (t) => {
  const wrapper = shallow(
    <Fab
      classes={{}}
      animateIn
      icon="build"
    />,
  );
  const root = wrapper.find({ role: 'button' });

  t.true(root.prop('className').includes('animate-in'));
});

test('should set the aria-disabled attribute on the root node', (t) => {
  const wrapper = mount(
    <FabWrapper
      classes={{}}
      disabled
      icon="build"
    />,
  );
  const root = wrapper.find({ role: 'button' });

  t.deepEqual(root.prop('aria-disabled'), true);
});

test('should update the shadow when the fab receives / loses focus', (t) => {
  const wrapper = mount(<FabWrapper icon="build" />);
  const shadow = wrapper.find('.fab--shadow');

  wrapper.simulate('focus');

  t.deepEqual(shadow.node.style.opacity, '1');

  wrapper.simulate('blur');

  t.deepEqual(shadow.node.style.opacity, '0');
});

test('should only call onPress when a key event happens with a valid keyCode', (t) => {
  const onPress = sinon.spy();
  const wrapper = shallow(
    <Fab
      classes={{}}
      onPress={onPress}
      icon="build"
    />,
  );
  const instance = wrapper.instance();

  instance.handleKeyPress({ keyCode: Fab.keyCodes[0] });

  t.deepEqual(onPress.callCount, 1);
});

test('should not call onPress when a key event happens with an invalid keyCode', (t) => {
  const onPress = sinon.spy();
  const wrapper = shallow(
    <Fab
      classes={{}}
      onPress={onPress}
      icon="build"
    />,
  );
  const instance = wrapper.instance();

  instance.handleKeyPress({ keyCode: 0 });

  t.deepEqual(onPress.callCount, 0);
});

test('should render different styles with the mini prop', (t) => {
  mount(
    <FabWrapper
      icon="build"
      mini
    />,
  );

  t.pass();
});

test('should be able to call the default event handlers', (t) => {
  Fab.defaultProps.onPress();

  Fab.defaultProps.onFocus();
  Fab.defaultProps.onBlur();

  t.pass();
});
