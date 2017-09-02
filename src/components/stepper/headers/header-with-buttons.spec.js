import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import HeaderWithButtons from './header-with-buttons';

const props = {
  sections: [{}, {}, {}],
  currentSection: 0,
  forward: () => {},
  back: () => {},
};

test('should render a header component', (t) => {
  const wrapper = shallow(<HeaderWithButtons {...props}>Test</HeaderWithButtons>).dive();

  t.deepEqual(wrapper.find('header').length, 1);
});

test('should render two Button components', (t) => {
  const wrapper = shallow(<HeaderWithButtons {...props}>Test</HeaderWithButtons>).dive();

  t.deepEqual(wrapper.find('Jss(Button)').length, 2);
});

test('should not have buttons when the backButton and nextButton prop are null', (t) => {
  const wrapper = shallow(
    <HeaderWithButtons
      {...props}
      backButton={null}
      nextButton={null}
    >
      Test
    </HeaderWithButtons>,
  ).dive();

  t.deepEqual(wrapper.find('Jss(Button)').length, 0);
});

test('should disable the back button when the current section is 0', (t) => {
  const wrapper = shallow(<HeaderWithButtons {...props}>Test</HeaderWithButtons>).dive();
  const backButton = wrapper.find('Jss(Button)').first();

  t.deepEqual(backButton.prop('disabled'), true);
});

test('should disable the next button when the current section is the last section', (t) => {
  const wrapper = shallow(
    <HeaderWithButtons
      {...props}
      currentSection={2}
    >
      Test
    </HeaderWithButtons>,
  ).dive();
  const backButton = wrapper.find('Jss(Button)').last();

  t.deepEqual(backButton.prop('disabled'), true);
});

test('should call the disableNextButton when the current section is not the last section', (t) => {
  const disableNextButton = sinon.spy();

  shallow(
    <HeaderWithButtons
      {...props}
      disableNextButton={disableNextButton}
    >
      Test
    </HeaderWithButtons>,
  ).dive();

  t.deepEqual(disableNextButton.callCount, 1);
});

test('should call the disableBackButton when the current section is not 0', (t) => {
  const disableBackButton = sinon.spy();

  shallow(
    <HeaderWithButtons
      {...props}
      currentSection={1}
      disableBackButton={disableBackButton}
    >
      Test
    </HeaderWithButtons>,
  ).dive();

  t.deepEqual(disableBackButton.callCount, 1);
});

test('should call the back function when the back button is pressed', (t) => {
  const back = sinon.spy();
  const wrapper = shallow(
    <HeaderWithButtons
      {...props}
      back={back}
    >
      Test
    </HeaderWithButtons>,
  ).dive();
  const backButton = wrapper.find('Jss(Button)').first();

  backButton.simulate('press');

  t.deepEqual(back.callCount, 1);
});

test('should call the forward function when the next button is pressed', (t) => {
  const forward = sinon.spy();
  const wrapper = shallow(
    <HeaderWithButtons
      {...props}
      forward={forward}
    >
      Test
    </HeaderWithButtons>,
  ).dive();
  const backButton = wrapper.find('Jss(Button)').last();

  backButton.simulate('press');

  t.deepEqual(forward.callCount, 1);
});
