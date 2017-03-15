import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ExpansionPanel from './expansion-panel';

storiesOf('ExpansionPanel', module)
  .add('Default styles', () => (
    <ExpansionPanel
      label="Region"
      value="Europe"
      style={{ width: '800px' }}
    >
      Some Content
    </ExpansionPanel>
  ));
