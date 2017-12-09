import test from 'ava';
import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import is from 'is_js';
import sinon from 'sinon';

import withKeyPress from './with-key-press';

const Component = props => (
  <div // eslint-disable-line jsx-a11y/no-static-element-interactions
    onKeyUp={props.onKeyUp}
    onKeyDown={props.createKeyDownHandler(props.spy)}
  />
);

Component.propTypes = {
  onKeyUp: PropTypes.func.isRequired,
  createKeyDownHandler: PropTypes.func.isRequired,
  spy: PropTypes.func,
};

Component.defaultProps = { spy: () => {} };

test('should return a function', (t) => {
  t.true(
    is.function(withKeyPress()),
  );
});

test('should compute the display name', (t) => {
  const WrappedComponent = withKeyPress()(Component);
  const wrapper = mount(<WrappedComponent />);

  t.deepEqual(wrapper.find('WithKeyPress(Component)').length, 1);
});

test('should pass the createKeyDownHandler and onKeyUp prop', (t) => {
  const WrappedComponent = withKeyPress()(Component);
  const wrapper = mount(<WrappedComponent />);
  const props = wrapper.find('Component').props();

  t.true(is.function(props.createKeyDownHandler));
  t.true(is.function(props.onKeyUp));
});

test('should call the actual onKeyDown prop when passed', (t) => {
  const WrappedComponent = withKeyPress()(Component);
  const onKeyDown = sinon.spy();
  const wrapper = mount(<WrappedComponent onKeyDown={onKeyDown} />);

  wrapper.find('div').simulate('keyDown');

  t.deepEqual(onKeyDown.callCount, 1);
});

test('should call the actual onKeyUp prop when passed', (t) => {
  const WrappedComponent = withKeyPress()(Component);
  const onKeyUp = sinon.spy();
  const wrapper = mount(<WrappedComponent onKeyUp={onKeyUp} />);

  wrapper.find('div').simulate('keyUp');

  t.deepEqual(onKeyUp.callCount, 1);
});

test('should call the spy function when the first key down event get\'s fired', (t) => {
  const WrappedComponent = withKeyPress()(Component);
  const spy = sinon.spy();
  const wrapper = mount(<WrappedComponent spy={spy} />);

  wrapper.find('div').simulate('keyDown');

  t.deepEqual(spy.callCount, 1);
});

test('should not call the spy function when the second key down event get\'s fired', (t) => {
  const WrappedComponent = withKeyPress()(Component);
  const spy = sinon.spy();
  const wrapper = mount(<WrappedComponent spy={spy} />);

  wrapper.find('div').simulate('keyDown');
  wrapper.find('div').simulate('keyDown');

  t.deepEqual(spy.callCount, 1);
});

test('should only call press handler when the key code matches', (t) => {
  const WrappedComponent = withKeyPress({ keyCodes: [0] })(Component);
  const spy = sinon.spy();
  const wrapper = mount(<WrappedComponent spy={spy} />);

  wrapper.find('div').simulate('keyDown', { keyCode: 0 });

  t.deepEqual(spy.callCount, 1);

  wrapper.find('div').simulate('keyUp');

  wrapper.find('div').simulate('keyDown', { keyCode: 1 });

  t.deepEqual(spy.callCount, 1);
});
