import React from 'react';
import test from 'ava';
import { mount } from 'enzyme';

import Section from './section';

test('should render a div with the class `stepper--section`', (t) => {
  const wrapper = mount(<Section name="test">Test</Section>);

  t.deepEqual(wrapper.find('div.stepper--section').length, 1);
});
