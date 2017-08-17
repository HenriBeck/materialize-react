import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';

import CardActions from './card-actions';

test('should render a div with the class card--actions', (t) => {
  const wrapper = mount(<CardActions>Hello</CardActions>);

  t.deepEqual(wrapper.find('.card--actions').length, 1);
});

test('should add a class card--actions-stacked when the stacked prop is passed', (t) => {
  const wrapper = mount(<CardActions stacked>Hello</CardActions>);

  t.deepEqual(wrapper.find('.card--actions-stacked').length, 1);
});
