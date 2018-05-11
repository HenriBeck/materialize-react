// @flow strict

import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  number,
  select,
} from '@storybook/addon-knobs';
import noop from 'lodash.noop';

import Icon from '../Icon';
import IconButton from '../IconButton';
import createSheet from '../../styles/create-sheet';

import Badge from '.';

const styles = {
  badge: {
    right: 5,
    top: 5,
  },
};

const colorOptions = {
  primary: 'Primary',
  accent: 'Accent',
};

const Sheet = createSheet('Badge-Story', styles);

storiesOf('Badge', module)
  .add('With Icon', () => (
    <div style={{ position: 'relative' }}>
      <Icon>Bell</Icon>

      <Badge color={select('Color', colorOptions, 'primary')}>
        {number('Badge content', 10)}
      </Badge>
    </div>
  ))
  .add('With Icon Button', () => (
    <Sheet>
      {props => (
        <div style={{ position: 'relative' }}>
          <IconButton onPress={noop}>
            <Icon>bell</Icon>
          </IconButton>

          <Badge
            color={select('Color', colorOptions, 'primary')}
            className={props.classes.badge}
          >
            {number('Badge content', 9)}
          </Badge>
        </div>
      )}
    </Sheet>
  ))
  .add('Text', () => (
    <div
      style={{
        padding: 5,
        position: 'relative',
      }}
    >
      <Badge color={select('Color', colorOptions, 'primary')}>
        {number('Badge content', 9)}
      </Badge>

      Some text
    </div>
  ));
