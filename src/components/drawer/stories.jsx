import React from 'react';
import { storiesOf } from '@storybook/react';

import Drawer from './drawer';
import DrawerContent from './drawer-content';
import MainContent from './main-content';

storiesOf('Drawer', module)
  .add('Default styles', () => (
    <Drawer>
      <DrawerContent>Drawer Content</DrawerContent>

      <MainContent>Main Content</MainContent>
    </Drawer>
  ));
