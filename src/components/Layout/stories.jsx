// @flow strict

import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean,
  select,
} from '@storybook/addon-knobs';

import createSheet from '../../styles/create-sheet';
import Card from '../Card';

import Layout from '.';

const Sheet = createSheet('LayoutStory', {
  box: {
    width: 100,
    height: 100,
    margin: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

storiesOf('App Elements', module)
  .add('Layout', () => (
    <Sheet>
      {({ classes }) => (
        <Layout
          direction={select('Direction', {
            column: 'Column',
            row: 'Row',
          }, 'row')}
          reverse={boolean('Reverse', false)}
          inline={boolean('Inline', false)}
        >
          <Card className={classes.box}>1</Card>
          <Card className={classes.box}>2</Card>
          <Card className={classes.box}>3</Card>
          <Card className={classes.box}>4</Card>
          <Card className={classes.box}>5</Card>
        </Layout>
      )}
    </Sheet>
  ));
