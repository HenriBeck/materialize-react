import test from 'ava';

import breakpoints, {
  getMinWidthQuery,
  getMaxWidthQuery,
} from './breakpoints';

test('getMinWidthQuery should return a media query part', (t) => {
  t.deepEqual(
    getMinWidthQuery('tablet'),
    'and (min-width: 641px)',
  );
});

test('getMinWidthQuery should return an empty string when the size has no minimal width', (t) => {
  t.deepEqual(getMinWidthQuery('mobile'), '');
});

test('getMaxWidthQuery should return a media query part', (t) => {
  t.deepEqual(
    getMaxWidthQuery('tablet'),
    'and (max-width: 1024px)',
  );
});

test('getMaxWidthQuery should return an empty string when the size has no minimal width', (t) => {
  t.deepEqual(getMaxWidthQuery('desktop'), '');
});

test('breakpoint.up should return a media query which has the min-width query', (t) => {
  t.deepEqual(
    breakpoints.up('desktop'),
    '@media screen and (min-width: 1025px)',
  );
});

test('breakpoint.down should return a media query which has the max-width query', (t) => {
  t.deepEqual(
    breakpoints.down('mobile'),
    '@media screen and (max-width: 640px)',
  );
});

test('breakpoint.only should return a media query with a min.width and max-width property', (t) => {
  t.deepEqual(
    breakpoints.only('tablet'),
    '@media screen and (min-width: 641px) and (max-width: 1024px)',
  );
});
