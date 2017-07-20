import test from 'ava';
import React from 'react';

import { mount } from '../../../tests/helpers/enzyme';
import SpinnerWrapper, { Spinner } from './spinner';

const props = {
  classes: { spinner: 'spinner' },
  theme: { spinner: {} },
};

test('should render a div with an svg inside', (t) => {
  const wrapper = mount(<SpinnerWrapper />);

  t.deepEqual(wrapper.find('Jss(Spinner)').length, 1);
});

test('should fade in the animation when the active prop is passed', (t) => {
  const wrapper = mount(
    <Spinner
      active
      {...props}
    />,
  );
  const root = wrapper.find('.spinner');

  t.deepEqual(root.node.style.opacity, '1');
});
