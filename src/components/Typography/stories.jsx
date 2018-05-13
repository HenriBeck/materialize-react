// @flow strict

import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import createSheet from '../../styles/create-sheet';

import Typography, { type Color } from '.';

type Props = { color: Color };

const Sheet = createSheet('Typography-Story', {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '16px',
  },
});

function Story(props: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <div className={classes.container}>
          <Typography
            color={props.color}
            typography="headline"
          >
            Headline
          </Typography>

          <Typography
            color={props.color}
            typography="title"
          >
            Title
          </Typography>

          <Typography
            color={props.color}
            typography="body1"
          >
            Body 1
          </Typography>

          <Typography
            color={props.color}
            typography="button"
          >
            Button
          </Typography>
        </div>
      )}
    </Sheet>
  );
}

storiesOf('Basic Elements', module)
  .add('Typography', () => (
    <Story
      color={select('Color', {
        text: 'Text',
        secondary: 'Secondary',
        disabled: 'Disabled',
        hint: 'Hint',
        primary: 'Primary',
        accent: 'Accent',
      }, 'text')}
    />
  ));
