import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import { mount } from '../../../tests/helpers/enzyme';
import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

import SwitchWrapper, { Switch } from './switch';

const props = {
  classes: createClassesFromStyles(Switch.styles),
  toggled: false,
  onChange: () => {},
};

test('should render a Switch component and a span with the role of switch', (t) => {
  const wrapper = mount(<SwitchWrapper {...props} />);

  t.deepEqual(wrapper.find('Switch').length, 1);
  t.deepEqual(wrapper.find('span[role="switch"]').length, 1);
});

test('should have the aria-disabled prop set to true when disabled', (t) => {
  const wrapper = mount(
    <SwitchWrapper
      {...props}
      disabled
    />,
    { type: 'dark' },
  );

  t.deepEqual(wrapper.find('span[aria-disabled=true]').length, 1);
});

test('should call the onChange prop when the switch get\'s clicked', (t) => {
  const onChange = sinon.spy();
  const wrapper = shallow(
    <Switch
      {...props}
      onChange={onChange}
    />,
  );
  const instance = wrapper.instance();

  instance.handlePress();

  t.deepEqual(onChange.callCount, 1);
});

test('should call the onChange handler when a key is pressed', (t) => {
  const onChange = sinon.spy();
  const wrapper = shallow(
    <Switch
      {...props}
      onChange={onChange}
    />,
  );
  const instance = wrapper.instance();

  instance.handleKeyPress({ keyCode: Switch.keyCodes[0] });

  t.deepEqual(onChange.callCount, 1);
});

test('should not call the onChange handler when no key code is specified', (t) => {
  const onChange = sinon.spy();
  const wrapper = shallow(
    <Switch
      {...props}
      onChange={onChange}
    />,
  );
  const instance = wrapper.instance();

  instance.handleKeyPress({});

  t.deepEqual(onChange.callCount, 0);
});

test('should change the state when the component get\'s focused', (t) => {
  const wrapper = shallow(<Switch {...props} />);
  const instance = wrapper.instance();

  instance.handleFocus();

  t.deepEqual(wrapper.state('isFocused'), true);
});

test('should change the state when the component get\'s focused and blurred', (t) => {
  const wrapper = shallow(<Switch {...props} />);
  const instance = wrapper.instance();

  instance.handleFocus();

  instance.handleBlur();

  t.deepEqual(wrapper.state('isFocused'), false);
});
