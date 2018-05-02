// @flow strict

import {
  configure,
  addDecorator,
} from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';
// $FlowFixMe: Waiting for typing support for StrictMode
import React, { StrictMode } from 'react';
import whyDidYouUpdate from 'why-did-you-update';

import 'normalize.css';

import Decorator from './Decorator';

whyDidYouUpdate(React, { exclude: /^Sheet$/ });

addDecorator((story, info) => (
  <StrictMode>
    <Decorator info={info}>
      {withKnobs(story, info)}
    </Decorator>
  </StrictMode>
));

setOptions({
  name: 'Materialize React',
  url: 'https://github.com/HenriBeck/materialize-react',
});

configure(() => {
  // Basic Components
  require('../src/components/Typography/stories');
  require('../src/components/Icon/stories');
  require('../src/components/Divider/stories');

  // App Layout Elements
  require('../src/components/Drawer/stories');
  require('../src/components/Backdrop/stories');
  require('../src/components/Layout/stories');

  // Button Elements
  require('../src/components/Button/stories');
  require('../src/components/IconButton/stories');
  require('../src/components/Fab/stories');

  // Selection Elements
  require('../src/components/Checkbox/stories');
  require('../src/components/Switch/stories');
  require('../src/components/RadioGroup/stories');

  // Interactive Elements
  require('../src/components/Tabs/stories');
  require('../src/components/Slider/stories');
  require('../src/components/Ripple/stories');

  // Text Field Elements
  require('../src/components/TextArea/stories');
  require('../src/components/TextField/stories');

  // Progress & Activity
  require('../src/components/Progress/stories');
  require('../src/components/Spinner/stories');

  require('../src/components/Badge/stories');
  require('../src/components/List/stories');
  require('../src/components/Collapse/stories');
  require('../src/components/ExpansionPanel/stories');
  require('../src/components/Card/stories');
  require('../src/components/Avatar/stories');
  require('../src/components/Snackbar/stories');

  require('../src/components/Dialog/stories');
}, module);
