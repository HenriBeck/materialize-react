import {
  configure,
  addDecorator,
} from '@storybook/react';
import React from 'react';
import whyDidYouUpdate from 'why-did-you-update';

import 'normalize.css';
import 'mdi/css/materialdesignicons.css';

import Theme from '../src/styles/theme';
import Background from '../src/components/background';

addDecorator((story) => (
  <Theme>
    <Background
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      {story()}
    </Background>
  </Theme>
));

function loadStories() {
  whyDidYouUpdate(React, { include: /^pure/, exclude: /^Connect/ });

  require('../src/components/ripple/stories');
  require('../src/components/button/stories');
  require('../src/components/chip/stories');
}

configure(loadStories, module);
