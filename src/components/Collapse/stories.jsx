// @flow strict-local

import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import Collapse from '.';

storiesOf('Collapse', module)
  .add('Default Styles', () => (
    <Collapse
      isOpen={boolean('Open', false)}
      style={{
        alignSelf: 'start',
        paddingTop: 64,
      }}
    >
      <div
        style={{
          width: 200,
          height: 300,
        }}
      >
        SOME redadsadad
        adsadsdsdwdsadads
        adadawdwdawdadddd
        ddsddssadssd
        dasdsdfedfdfd
        s
      </div>
    </Collapse>
  ));
