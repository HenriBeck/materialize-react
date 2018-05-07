// @flow strict

import test from 'ava';

import { createTheme } from '../theme';

import {
  up,
  down,
  only,
} from './breakpoints';

const theme = createTheme({
  primary: 'blue',
  accent: 'blue',
  type: 'light',
});

test('up: should create a media query with a min-width query', (t) => {
  t.deepEqual(
    up(theme, 'tablet'),
    `@media screen and (min-width: ${theme.breakpoints.tablet[0]}px)`,
  );
});

test('up: should not have a min-width query when the minimal value for a device is null', (t) => {
  t.deepEqual(
    up(theme, 'mobile'),
    '@media screen',
  );
});

test('down: should create a media query with a max-width query', (t) => {
  t.deepEqual(
    down(theme, 'tablet'),
    `@media screen and (max-width: ${theme.breakpoints.tablet[1]}px)`,
  );
});

test('down: should not have a min-width query when the maximal value for a device is null', (t) => {
  t.deepEqual(
    down(theme, 'desktop'),
    '@media screen',
  );
});

test('only: should create a media query with a min-width and max-width query', (t) => {
  const minTablet = theme.breakpoints.tablet[0];
  const maxTablet = theme.breakpoints.tablet[1];

  t.deepEqual(
    only(theme, 'tablet'),
    `@media screen and (min-width: ${minTablet}px) and (max-width: ${maxTablet}px)`,
  );
});

test('only: should only have a min-width query when the maximal width is null', (t) => {
  t.deepEqual(
    only(theme, 'desktop'),
    `@media screen and (min-width: ${theme.breakpoints.desktop[0]}px)`,
  );
});

test('only: should only have a max-width query when the minimal width is null', (t) => {
  t.deepEqual(
    only(theme, 'mobile'),
    `@media screen and (max-width: ${theme.breakpoints.mobile[1]}px)`,
  );
});

