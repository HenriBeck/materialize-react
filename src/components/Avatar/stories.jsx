// @flow strict

import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import {
  colors,
  getColor,
} from '../../styles/colors';

import Avatar from '.';

storiesOf('Avatar', module)
  .add('With BG Image', () => (
    <Avatar
      size={48}
      type="img"
      src=""
    />
  ))
  .add('With Text and BG Color', () => (
    <Avatar
      size={48}
      type="name"
      bgColor={(
        getColor(
          select('Background Color', Object.keys(colors)),
          '500',
        )
      )}
    >
      HB
    </Avatar>
  ));
