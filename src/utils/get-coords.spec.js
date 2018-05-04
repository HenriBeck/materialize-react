// @flow strict

import test from 'ava';

import getCoords from './get-coords';

test('should return null when no coordinates were found ', (t) => {
  t.deepEqual(
    getCoords({}),
    null,
  );
});

test('should return the coords when the are', (t) => {
  t.deepEqual(
    getCoords({
      clientX: 5,
      clientY: 5,
    }),
    {
      x: 5,
      y: 5,
    },
  );
});
