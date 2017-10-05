import React from 'react';
import test from 'ava';

import { mount } from '../../../tests/helpers/enzyme';

import Drawer from './drawer';
import MainContent from './main-content';
import DrawerContent from './drawer-content';

const props = {
  drawerContent: <DrawerContent>Test</DrawerContent>,
  mainContent: <MainContent>Test</MainContent>,
  isNarrow: false,
  opened: false,
  className: '',
  drawerPosition: 'left',
  onBackdropPress: () => {},
  onTransitionEnd: () => {},
};

test('should render div with the class of drawer', (t) => {
  const wrapper = mount(<Drawer {...props} />);

  t.deepEqual(wrapper.find('.drawer').length, 1);
});

test('should add a backdrop active class when the drawer is narrow and opened', (t) => {
  const wrapper = mount(
    <Drawer
      {...props}
      isNarrow
      opened
    />,
  );

  t.deepEqual(wrapper.find('span.drawer--backdrop-active').length, 1);
});

test('should add add a drawer-content-narrow class when the drawer is narrow', (t) => {
  const wrapper = mount(
    <Drawer
      {...props}
      isNarrow
    />,
  );

  t.deepEqual(wrapper.find('aside.drawer--drawer-content-narrow').length, 1);
});

test('should add add a class when the drawer is narrow and opened', (t) => {
  const wrapper = mount(
    <Drawer
      {...props}
      isNarrow
      opened
    />,
  );

  t.deepEqual(wrapper.find('aside.drawer--drawer-content-narrow-opened').length, 1);
});

