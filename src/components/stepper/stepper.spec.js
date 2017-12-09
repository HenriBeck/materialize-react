import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import {
  shallow,
  mount,
} from 'enzyme';

import createClassesFromStyles from '../../../tests/helpers/create-classes-from-styles';

import StepperWrapper, { Stepper } from './stepper';

const props = {
  classes: createClassesFromStyles(Stepper.styles),
  header: Stepper.Headers.Text,
  section: 0,
};

test('should throw an error if a non section child is passed', (t) => {
  t.throws(() => shallow(
    <Stepper {...props}>
      <div />
    </Stepper>,
  ));
});

test('should throw an error if only one section is passed', (t) => {
  t.throws(() => shallow(
    <Stepper {...props}>
      <Stepper.Section>
        Test
      </Stepper.Section>
    </Stepper>,
  ));
});

test('should render a div with the class of stepper and the passed sections', (t) => {
  const header = () => <header />;
  const wrapper = mount(
    <StepperWrapper
      section={0}
      header={header}
    >
      <Stepper.Section>Test 1</Stepper.Section>
      <Stepper.Section>Test 2</Stepper.Section>
      <Stepper.Section>Test 3</Stepper.Section>
    </StepperWrapper>,
  );

  t.deepEqual(wrapper.find('div.stepper').length, 1);
  t.deepEqual(wrapper.find('Section').length, 3);
});

test('should call onHide when the section changes', (t) => {
  const onHide = sinon.spy();
  const wrapper = shallow(
    <Stepper {...props}>
      <Stepper.Section onHide={onHide}>Test 1</Stepper.Section>
      <Stepper.Section>Test 2</Stepper.Section>
      <Stepper.Section>Test 3</Stepper.Section>
    </Stepper>,
  );

  wrapper.setProps({ section: 1 });

  t.deepEqual(onHide.callCount, 1);
});

test('should call onShow when the section changes', (t) => {
  const onShow = sinon.spy();
  const wrapper = shallow(
    <Stepper {...props}>
      <Stepper.Section>Test 1</Stepper.Section>
      <Stepper.Section onShow={onShow}>Test 2</Stepper.Section>
      <Stepper.Section>Test 3</Stepper.Section>
    </Stepper>,
  );

  wrapper.setProps({ section: 1 });

  wrapper.setProps({ className: 'test' });

  t.deepEqual(onShow.callCount, 1);
});
