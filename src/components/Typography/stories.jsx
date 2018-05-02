// @flow strict

import React, { type Node } from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import createSheet from '../../styles/create-sheet';

import Typography from '.';

const Sheet = createSheet('TypoStory', {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '16px',
  },
});

storiesOf('Basic Elements', module)
  .add('Typography', (): Node => {
    const color = select('Color', {
      text: 'Text',
      secondary: 'Secondary',
      disabled: 'Disabled',
      hint: 'Hint',
      primary: 'Primary',
      accent: 'Accent',
    }, 'text');

    return (
      <Sheet>
        {({ classes }) => (
          <div className={classes.container}>
            <Typography
              color={color}
              typography="headline"
            >
              Headline
            </Typography>

            <Typography
              color={color}
              typography="title"
            >
              Title
            </Typography>

            <Typography
              color={color}
              typography="body1"
            >
              Body 1
            </Typography>

            <Typography
              color={color}
              typography="button"
            >
              Button
            </Typography>
          </div>
        )}
      </Sheet>
    );
  });
