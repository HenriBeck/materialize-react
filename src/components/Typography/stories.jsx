// @flow strict-local

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
const typos = [
  ['headline1', 'Headline 1'],
  ['headline2', 'Headline 2'],
  ['headline3', 'Headline 3'],
  ['headline4', 'Headline 4'],
  ['headline5', 'Headline 5'],
  ['headline6', 'Headline 6'],
  ['subtitle1', 'Subtitle 1'],
  ['subtitle2', 'Subtitle 2'],
  ['body1', 'Body 1'],
  ['body2', 'Body 2'],
  ['button', 'Button'],
  ['caption', 'Caption'],
  ['overline', 'Overline'],
];

function Story(props: Props) {
  return (
    <Sheet>
      {({ classes }) => (
        <div className={classes.container}>
          {typos.map(([typo, display]) => (
            <Typography
              key={typo}
              color={props.color}
              typography={typo}
            >
              {display}
            </Typography>
          ))}
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
