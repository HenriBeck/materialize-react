import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import StepperContainer from './stepper-container';

const props = {
  header: (<header />),
  children: (<div />),
  currentSection: 0,
};

test('should render a div with the class of stepper', (t) => {
  const wrapper = mount(<StepperContainer {...props} />);

  t.deepEqual(wrapper.find('div.stepper').length, 1);
});
