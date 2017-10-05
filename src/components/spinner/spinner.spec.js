import test from 'ava';
import React from 'react';

import { mount } from '../../../tests/helpers/enzyme';
import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

import SpinnerWrapper, { Spinner } from './spinner';

const classes = createClassesFromStyles(Spinner.styles);

test('should render a Jss Hoc and a div with the class of progress', (t) => {
  const wrapper = mount(<SpinnerWrapper />);

  t.deepEqual(wrapper.find('Jss(Spinner)').length, 1);
});

test('should fade in the animation when the active prop is passed', (t) => {
  const wrapper = mount(
    <Spinner
      active
      classes={classes}
    />,
  );

  t.deepEqual(wrapper.state('opacity'), 1);
  t.deepEqual(wrapper.state('active'), true);
});

test('should change the opacity to 0 when the active prop is removed', (t) => {
  const wrapper = mount(
    <Spinner
      active
      classes={classes}
    />,
  );

  wrapper.setProps({ active: false });

  t.deepEqual(wrapper.state('opacity'), 0);
  t.deepEqual(wrapper.state('active'), true);
});

test('should set the active state to false when the spinner has finished animating out', (t) => {
  const wrapper = mount(
    <Spinner
      active
      classes={classes}
    />,
  );

  wrapper.setProps({ active: false });

  wrapper.simulate('transitionEnd');

  t.deepEqual(wrapper.state('active'), false);
});

test('should not change active state to false when the spinner has finished animating in', (t) => {
  const wrapper = mount(<Spinner classes={classes} />);

  wrapper.setProps({ active: true });

  wrapper.simulate('transitionEnd');

  t.deepEqual(wrapper.state('active'), true);
});

test('should not change the active state when the active prop doesn\'t change', (t) => {
  const wrapper = mount(<Spinner classes={classes} />);

  const prevActive = wrapper.state('active');

  wrapper.setProps({ className: 'some' });

  t.deepEqual(wrapper.state('active'), prevActive);
});
