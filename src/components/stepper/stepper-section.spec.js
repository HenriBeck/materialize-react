import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import StepperSection from './stepper-section';

test('should render a div with the class `stepper--section`', (t) => {
  const wrapper = mount(<StepperSection>Test</StepperSection>);
  const div = wrapper.find('div');

  t.deepEqual(div.length, 1);
  t.deepEqual(div.prop('className').includes('stepper--section'), true);
});
