import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import StepperContainer from './stepper-container';

const props = {
  header: (<header />),
  children: (<div />),
  currentSection: 0,
  className: '',
  headerAtBottom: false,
};

test('should render a div with the class of stepper', (t) => {
  const wrapper = mount(<StepperContainer {...props} />);

  t.deepEqual(wrapper.find('div.stepper').length, 1);
});

test('should add a class of stepper--header-at-bottom to the root', (t) => {
  const wrapper = mount(
    <StepperContainer
      {...props}
      headerAtBottom
    />,
  );

  t.deepEqual(wrapper.find('.stepper--header-at-bottom').length, 1);
});
