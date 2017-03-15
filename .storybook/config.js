import React from 'react';
import {
  configure,
  addDecorator,
} from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import { setOptions } from '@kadira/storybook-addon-options';
import 'web-animations-js';
import 'mdi/css/materialdesignicons.min.css';
import 'normalize.css';

import Theme from '../src/styles/theme/theme';
import Background from '../src/components/background';

const req = require.context('../src/components', true, /stories\.jsx$/);

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
  name: 'TF2Pickup Components',
  url: 'https://github.com/TF2PickupNET',
});

configure(() => req.keys().forEach(req), module);
