import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import Ripple from './ripple';
import Wave from './wave';
import { mount } from 'enzyme';
import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

const defaultProps = {
  waves: [],
  initialOpacity: 0.25,
  classes: createClassesFromStyles(Ripple.styles),
  className: '',
  isFocused: false,
  focusOpacity: 0.2,
  focusColor: '',
  round: false,
  nowaves: false,
  onDownAction: () => {},
  onAnimationFinish: () => {},
  onMouseLeave: () => {},
  createRef: () => {},
};

test('should render a span with the riplpe class', (t) => {
  const wrapper = mount(<Ripple {...defaultProps} />);

  t.deepEqual(wrapper.find('Jss(Ripple)').length, 1);
  t.deepEqual(wrapper.find('span.ripple').length, 1);
});

test('should render a Wave component', (t) => {
  const wrapper = mount(
    <Ripple
      {...defaultProps}
      waves={[{
        id: 1,
        style: {
          height: 0,
          width: 0,
          left: 0,
          top: 0,
        },
        radius: 5,
      }]}
    />,
  );
  const rootNode = wrapper.find('.ripple');

  rootNode.simulate('touchEnd');

  t.deepEqual(wrapper.find(Wave).length, 1);
});

test('should emit an up action when the mouse leaves the element', (t) => {
  const onMouseLeave = sinon.spy();
  const wrapper = mount(
    <Ripple
      {...defaultProps}
      onMouseLeave={onMouseLeave}
    />,
  );

  wrapper.simulate('mouseLeave');

  t.deepEqual(onMouseLeave.callCount, 1);
});
