import React from 'react';
import {
  configure,
  addDecorator,
} from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import { setOptions } from '@kadira/storybook-addon-options';
import 'web-animations-js';
import 'babel-polyfill';
import 'mdi/css/materialdesignicons.min.css';
import 'normalize.css';

import Theme from '../src/styles/theme/theme.jsx';
import defaultTheme from '../src/styles/theme/default-theme';

const req = require.context('../src/components', true, /stories\.jsx$/);

addDecorator((...args) => (
  <Theme>
    <div
      style={{
        backgroundColor: defaultTheme.variables.backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: defaultTheme.variables.textColor,
        minHeight: '100vh',
      }}
    >
      {withKnobs(...args)}
    </div>
  </Theme>
));

setOptions({
  name: 'TF2Pickup Components',
  url: 'https://github.com/TF2PickupNET',
});

configure(() => req.keys().forEach(req), module);
