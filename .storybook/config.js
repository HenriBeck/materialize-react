/* eslint-disable global-require */

import {
  configure,
  addDecorator,
} from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import 'normalize.css';
import 'mdi/css/materialdesignicons.css';

import Theme from '../src/styles/theme';
import Background from '../src/components/background';

addDecorator((...args) => (
  <Theme>
    <Background
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      {withKnobs(...args)}
    </Background>
  </Theme>
));

setOptions({
  name: 'Materialize React',
  url: 'https://github.com/HenriBeck/materialize-react',
});

configure(() => {
  require('../src/components/ripple/stories');
  require('../src/components/button/stories');
  require('../src/components/spinner/stories');
  require('../src/components/progress/stories');
  require('../src/components/fab/stories');
  require('../src/components/checkbox/stories');
  require('../src/components/switch/stories');
  require('../src/components/radio-button-group/stories');
  require('../src/components/tabs/stories');
  require('../src/components/drawer/stories');
  require('../src/components/toolbar/stories');
  require('../src/components/snackbar/stories');
  require('../src/components/dialog/stories');
  require('../src/components/card/stories');
  require('../src/components/typography/stories');
  require('../src/components/icon/stories');
  require('../src/components/icon-button/stories');
  require('../src/components/badge/stories');
}, module);
