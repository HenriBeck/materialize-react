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

const componentStories = require.context('../', true, /stories\.jsx$/);

configure(() => {
  componentStories.keys().forEach(componentStories);
}, module);
