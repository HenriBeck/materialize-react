import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import { mount } from '../../../../tests/helpers/enzyme';

import HeaderWithButtons from './header-with-buttons';

const props = {
  totalSections: 3,
  currentSection: 0,
};

test('should render a header component', (t) => {
  const wrapper = mount(<HeaderWithButtons {...props}>Test</HeaderWithButtons>);

  t.deepEqual(wrapper.find('header').length, 1);
  t.deepEqual(wrapper.find('Jss(Button)').length, 2);
});

test('should not have buttons when the backButton and nextButton prop are null', (t) => {
  const wrapper = mount(
    <HeaderWithButtons
      {...props}
      backButton={null}
      nextButton={null}
    >
      Test
    </HeaderWithButtons>,
  );

  t.deepEqual(wrapper.find('Jss(Button)').length, 0);
});

test('should disable the back button when the current section is 0', (t) => {
  const wrapper = mount(<HeaderWithButtons {...props}>Test</HeaderWithButtons>);
  const backButton = wrapper.find('Jss(Button)').first();

  t.deepEqual(backButton.prop('disabled'), true);
});

test('should disable the next button when the current section is the last section', (t) => {
  const wrapper = mount(
    <HeaderWithButtons
      {...props}
      currentSection={2}
    >
      Test
    </HeaderWithButtons>,
  );
  const backButton = wrapper.find('Jss(Button)').last();

  t.deepEqual(backButton.prop('disabled'), true);
});

test('should call the back function when the back button is pressed', (t) => {
  const back = sinon.spy();
  const wrapper = mount(
    <HeaderWithButtons
      {...props}
      back={back}
    >
      Test
    </HeaderWithButtons>,
  );
  const backButton = wrapper.find('Jss(Button)').first();

  backButton.simulate('click');

  t.deepEqual(back.callCount, 1);
});

test('should call the forward function when the next button is pressed', (t) => {
  const forward = sinon.spy();
  const wrapper = mount(
    <HeaderWithButtons
      {...props}
      forward={forward}
    >
      Test
    </HeaderWithButtons>,
  );
  const backButton = wrapper.find('Jss(Button)').last();

  backButton.simulate('click');

  t.deepEqual(forward.callCount, 1);
});
