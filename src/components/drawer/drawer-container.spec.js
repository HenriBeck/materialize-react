import React from 'react';
import test from 'ava';

import DrawerContainer from './drawer-container';
import { mount } from '../../../tests/helpers/enzyme';
import MainContent from './main-content';
import DrawerContent from './drawer-content';

const defaultProps = {
  drawerContent: <DrawerContent>Test</DrawerContent>,
  mainContent: <MainContent>Test</MainContent>,
  backdropEnabled: false,
  isNarrow: false,
  opened: false,
  drawerPosition: 'left',
  onBackdropPress: () => {},
  onTransitionEnd: () => {},
};

test('should render div with the class of drawer', (t) => {
  const wrapper = mount(<DrawerContainer {...defaultProps} />);

  t.deepEqual(wrapper.find('.drawer').length, 1);
});

test('should an element when the backdrop is enabled', (t) => {
  const wrapper = mount(
    <DrawerContainer
      {...defaultProps}
      backdropEnabled
    />,
  );

  t.deepEqual(wrapper.find('.drawer--backdrop').length, 1);
});

test('should add a backdrop active class when the drawer is narrow and opened', (t) => {
  const wrapper = mount(
    <DrawerContainer
      {...defaultProps}
      backdropEnabled
      isNarrow
      opened
    />,
  );

  t.deepEqual(wrapper.find('div.drawer--backdrop-active').length, 1);
});

test('should add add a narrow-mode class to the root when the drawer is narrow', (t) => {
  const wrapper = mount(
    <DrawerContainer
      {...defaultProps}
      isNarrow
    />,
  );

  t.deepEqual(wrapper.find('.drawer--narrow-mode').length, 1);
});

test('should add add a opened class to the root when the drawer is narrow and opened', (t) => {
  const wrapper = mount(
    <DrawerContainer
      {...defaultProps}
      isNarrow
      opened
    />,
  );

  t.deepEqual(wrapper.find('.drawer--opened').length, 1);
});

