import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import Chip from './chip.jsx';
import { shallow } from 'tests/enzyme';

test('should render a span with the class of chip', (t) => {
  const wrapper = shallow(<Chip id="test">Content</Chip>);

  t.deepEqual(wrapper.find('.chip').length, 1);
});

test('should render a icon if the button is deletable', (t) => {
  const wrapper = shallow(
    <Chip
      deletable
      id="test"
    >
      Content
    </Chip>,
  );

  t.deepEqual(wrapper.find('Icon').length, 1);
});

test('should call the onDelete handler if the icon is pressed', (t) => {
  const wrapper = shallow(
    <Chip
      deletable
      id="test"
    >
      Content
    </Chip>,
  );
  const icon = wrapper.find('.chip--icon');
  const onDelete = sinon.spy();

  icon.simulate('mouseDown');

  wrapper.setProps({ onDelete });

  icon.simulate('touchStart');

  t.deepEqual(onDelete.callCount, 1);
});

test('should have a image tag if the img prop is a string', (t) => {
  const wrapper = shallow(
    <Chip
      id="test"
      img="test"
    >
      Content
    </Chip>,
  );

  t.deepEqual(wrapper.find('img').length, 1);
});

test('should have a span with a className of chip--img if the img prop is an object', (t) => {
  const wrapper = shallow(
    <Chip
      id="test"
      img={{
        color: 'red',
        text: 'a',
      }}
    >
      Content
    </Chip>,
  );

  t.deepEqual(wrapper.find('span.chip--image').length, 1);
});
