// @flow strict-local

import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  number,
  select,
} from '@storybook/addon-knobs';
import noop from 'lodash.noop';

import Icon from '../Icon';
import IconButton from '../IconButton';

import Badge from '.';

const colorOptions = {
  primary: 'Primary',
  accent: 'Accent',
};

storiesOf('Badge', module)
  .add('With Icon', () => (
    <Badge
      content={number('Badge content', 10)}
      color={select('Color', colorOptions, 'primary')}
    >
      <Icon icon="bell" />
    </Badge>
  ))
  .add('With Icon Button', () => (
    <div style={{ position: 'relative' }}>
      <IconButton onPress={noop}>
        <Badge
          content={number('Badge content', 10)}
          color={select('Color', colorOptions, 'primary')}
        >
          <Icon icon="bell" />
        </Badge>
      </IconButton>
    </div>
  ))
  .add('Text', () => (
    <Badge
      content={number('Badge content', 9)}
      color={select('Color', colorOptions, 'primary')}
      style={{ padding: 5 }}
    >
      Some text
    </Badge>
  ));
