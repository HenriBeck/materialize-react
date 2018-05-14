// @flow strict-local

import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import {
  colors,
  getColor,
} from '../../styles/colors';

import Avatar from '.';

const colorOptions: { [keys: $Keys<typeof colors>]: string } = Object
  .keys(colors)
  .reduce((obj, color) => {
    return {
      ...obj,
      [color]: color
        .split(/[A]/)
        .map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
        .join(' '),
    };
  }, {});

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
          select('Background Color', colorOptions, 'red'),
          '500',
        )
      )}
    >
      HB
    </Avatar>
  ));
