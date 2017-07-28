import React from 'react';
import { storiesOf } from '@storybook/react';

import Parallax from './parallax';

storiesOf('Parallax', module)
  .add('Default Styles', () => (
    <div
      style={{
        padding: '120vh 0',
        width: '100%',
      }}
    >
      <Parallax img="http://via.placeholder.com/800x1000">
        <div style={{ padding: '35% 20%' }}>
          Some Children
        </div>
      </Parallax>
    </div>
  ));
