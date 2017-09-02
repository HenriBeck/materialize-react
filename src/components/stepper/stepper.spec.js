import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';

import Stepper from './stepper';

test('should throw an error when only 1 child is passed', (t) => {
  t.throws(
    () => shallow(
      <Stepper header={<header />}>
        <Stepper.Section name="1">1</Stepper.Section>
      </Stepper>,
    ),
  );
});

test('should throw an error the passed children aren\'t StepperSections', (t) => {
  t.throws(
    () => shallow(
      <Stepper header={<header />}>
        <div>Test</div>
      </Stepper>,
    ),
  );
});

test('should increment the currentSection state when the forward method is called', (t) => {
  const wrapper = shallow(
    <Stepper header={<header />}>
      <Stepper.Section name="1">1</Stepper.Section>
      <Stepper.Section name="2">2</Stepper.Section>
    </Stepper>,
  );
  const instance = wrapper.instance();

  instance.forward();

  t.deepEqual(wrapper.state('currentSection'), 1);
});

test('should not increment the current section when the current section is the last one', (t) => {
  const wrapper = shallow(
    <Stepper header={<header />}>
      <Stepper.Section name="1">1</Stepper.Section>
      <Stepper.Section name="2">2</Stepper.Section>
    </Stepper>,
  );
  const instance = wrapper.instance();

  wrapper.setState({ currentSection: 1 });

  instance.forward();

  t.deepEqual(wrapper.state('currentSection'), 1);
});

test('should not decrement the current section when the current section is the first one', (t) => {
  const wrapper = shallow(
    <Stepper header={<header />}>
      <Stepper.Section name="1">1</Stepper.Section>
      <Stepper.Section name="2">2</Stepper.Section>
    </Stepper>,
  );
  const instance = wrapper.instance();

  instance.back();

  t.deepEqual(wrapper.state('currentSection'), 0);
});

test('should decrement the current section when the back method is called', (t) => {
  const wrapper = shallow(
    <Stepper header={<header />}>
      <Stepper.Section name="1">1</Stepper.Section>
      <Stepper.Section name="2">2</Stepper.Section>
    </Stepper>,
  );
  const instance = wrapper.instance();

  wrapper.setState({ currentSection: 1 });

  instance.back();

  t.deepEqual(wrapper.state('currentSection'), 0);
});
