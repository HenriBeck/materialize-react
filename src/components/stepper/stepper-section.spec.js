import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import StepperSection from './stepper-section';

test('should render a div with the class `stepper--section`', (t) => {
  const wrapper = mount(<StepperSection name="test">Test</StepperSection>);

  t.deepEqual(wrapper.find('div.stepper--section').length, 1);
});
