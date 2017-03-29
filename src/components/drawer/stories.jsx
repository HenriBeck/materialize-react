import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Drawer from './drawer';

storiesOf('Drawer', module)
  .add('Default styles', () => (
    <Drawer>
      <Drawer.DrawerContent
        style={{
          height: '100%',
          backgroundColor: 'red',
        }}
      >
        Hi
      </Drawer.DrawerContent>

      <Drawer.MainContent>
        Hi
      </Drawer.MainContent>
    </Drawer>
  ));
